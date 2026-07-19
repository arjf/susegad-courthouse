#!/usr/bin/env node
// Daily metrics collector — fetches from Vercel, Cloudflare, Slack (stubs for GA4, Meta Ads)
// Usage: VERCEL_TOKEN=... CLOUDFLARE_TOKEN=... SLACK_TOKEN=... SLACK_CHANNEL=C0BK4GL0C0Y node scripts/daily-metrics.mjs

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const CLOUDFLARE_TOKEN = process.env.CLOUDFLARE_TOKEN;
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const SLACK_CHANNEL = process.env.SLACK_CHANNEL || 'C0BK4GL0C0Y';
const VERCEL_TEAM = 'team_AjwhhNVwaMcOrdrMCxwObb21';
const VERCEL_PROJECT = 'prj_a9sd05pjfDAfbrTJLURyrpL4gSio';
const CF_ZONE = 'd1e04be2b36962c754844ae02d6fa43c';

async function fetchVercel() {
  const headers = { Authorization: `Bearer ${VERCEL_TOKEN}` };
  const [deployments, errors] = await Promise.all([
    fetch(`https://api.vercel.com/v9/projects/${VERCEL_PROJECT}/deployments?limit=5&teamId=${VERCEL_TEAM}`, { headers })
      .then(r => r.json()).catch(() => ({ deployments: [] })),
    fetch(`https://api.vercel.com/v1/projects/${VERCEL_PROJECT}/errors?limit=5&teamId=${VERCEL_TEAM}`, { headers })
      .then(r => r.json()).catch(() => ({ errors: [] })),
  ]);

  const deploys = (deployments.deployments || []).map(d => ({
    date: new Date(d.createdAt).toLocaleDateString('en-IN'),
    state: d.readyState,
    branch: d.meta?.branch || '?',
  }));

  return { deployments: deploys, recentErrors: errors.errors?.length || 0 };
}

async function fetchCloudflare() {
  try {
    const dash = await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE}/analytics/dashboard`, {
      headers: { Authorization: `Bearer ${CLOUDFLARE_TOKEN}` },
    }).then(r => r.json());

    const totals = dash?.result?.totals || {};
    return {
      requests: totals?.requests?.all || 0,
      bandwidth: totals?.bandwidth?.all || 0,
      threats: totals?.threats?.all || 0,
      visits: totals?.visits?.all || 0,
      cacheHit: totals?.requests?.cached ? (totals.requests.cached / (totals.requests.all || 1) * 100).toFixed(1) : 'N/A',
    };
  } catch {
    return { requests: 'N/A', bandwidth: 'N/A', threats: 'N/A', visits: 'N/A', cacheHit: 'N/A' };
  }
}

function formatBytes(bytes) {
  if (!bytes || bytes === 'N/A') return 'N/A';
  const gb = bytes / 1e9;
  return gb > 1 ? `${gb.toFixed(2)} GB` : `${(bytes / 1e6).toFixed(1)} MB`;
}

function formatNumber(n) {
  if (n === 'N/A' || n == null) return 'N/A';
  return Number(n).toLocaleString('en-IN');
}

async function main() {
  const [vercel, cf] = await Promise.all([fetchVercel(), fetchCloudflare()]);

  const latestDeploy = vercel.deployments[0];
  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: '📊 Daily Metrics — Susegad Courthouse' } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Date:* ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` } },
    { type: 'divider' },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: [
          '*🚀 Vercel*',
          `Last deploy: ${latestDeploy ? `${latestDeploy.state} (${latestDeploy.branch}, ${latestDeploy.date})` : 'None'}`,
          `Recent deploys (5): ${vercel.deployments.length}`,
          `Runtime errors: ${vercel.recentErrors}`,
        ].join('\n'),
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: [
          '*☁️ Cloudflare (thesusegadcourtyard.com)*',
          `Requests: ${formatNumber(cf.requests)}`,
          `Visits: ${formatNumber(cf.visits)}`,
          `Bandwidth: ${formatBytes(cf.bandwidth)}`,
          `Threats: ${formatNumber(cf.threats)}`,
          `Cache hit ratio: ${cf.cacheHit}${cf.cacheHit !== 'N/A' ? '%' : ''}`,
        ].join('\n'),
      },
    },
  ];

  blocks.push(
    { type: 'divider' },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: [
          '*📈 Google Analytics*',
          `Sessions: \`— requires GA4 API key\``,
          `Page views: \`— requires GA4 API key\``,
          `Bounce rate: \`— requires GA4 API key\``,
          '',
          '*📣 Meta Ads*',
          `Impressions: \`— requires Meta Ads API key\``,
          `Clicks: \`— requires Meta Ads API key\``,
          `Spend: \`— requires Meta Ads API key\``,
        ].join('\n'),
      },
    },
  );

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: { Authorization: `Bearer ${SLACK_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ channel: SLACK_CHANNEL, blocks, text: 'Daily Metrics — Susegad Courthouse' }),
  });

  const result = await res.json();
  if (!result.ok) {
    console.error('Slack API error:', result.error);
    process.exit(1);
  }
  console.log('Metrics posted to Slack:', result.ts);
}

main().catch(err => { console.error(err); process.exit(1); });
