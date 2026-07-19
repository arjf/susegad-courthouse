---
description: Universal Slack setup for any project in this workspace
---

# Slack Playbook

Workspace: **A better world** (`T0BJ6JLAJJH`)
Bot: **Kilo** (`U0BJ6R8DSDB`, token in global `kilo.json`)

## Channel template

When setting up Slack for a new project `{name}`, create these channels:

| Channel | Purpose |
|---------|---------|
| `#{name}-chat` | General discussion, questions, coordination |
| `#{name}-commits` | Git commit notifications (clean messages, no spam) |
| `#{name}-workflows` | CI/CD pipeline status |
| `#{name}-logs` | Runtime / deployment / error logs |
| `#{name}-incidents` | Production outages, critical errors, postmortems |
| `#{name}-metrics` | Daily dashboard — Vercel, Cloudflare, GA4, Meta Ads |

## Agent setup instructions

Run these steps in order for any new project:

### 1. Create channels

```bash
for name in "{name}-chat" "{name}-commits" "{name}-workflows" "{name}-logs" "{name}-incidents" "{name}-metrics"; do
  curl -s -X POST -H "Authorization: Bearer \$SLACK_BOT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$name\"}" \
    https://slack.com/api/conversations.create
done
```

### 2. Join bot to channels

Get channel IDs from `conversations.list`, then for each:

```bash
curl -s -X POST -H "Authorization: Bearer \$SLACK_BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"channel\":\"\$CHANNEL_ID\"}" \
  https://slack.com/api/conversations.join
```

### 3. Invite workspace owner

```bash
curl -s -X POST -H "Authorization: Bearer \$SLACK_BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"channel\":\"\$CHANNEL_ID\",\"users\":\"U0BJ9T9S9BL\"}" \
  https://slack.com/api/conversations.invite
```

### 4. Post intro messages

Post a purpose-defining message in each channel so users know what it's for. Use `chat.postMessage` or the `slack_post_message` MCP tool.

### 5. Test

- Read history from each channel: `slack_get_channel_history`
- Post a test message: `slack_post_message`
- Verify bot can read its own messages

## Available MCP tools

| Tool | What it does |
|------|-------------|
| `slack_list_channels` | List public channels |
| `slack_post_message` | Post a message to a channel |
| `slack_reply_to_thread` | Reply in a thread |
| `slack_add_reaction` | React to a message |
| `slack_get_channel_history` | Read recent messages |
| `slack_get_thread_replies` | Read thread replies |
| `slack_get_users` | List workspace users |
| `slack_get_user_profile` | Get user details |

## Automation flows (per project)

| Channel | Trigger | Workflow |
|---------|---------|----------|
| `{name}-commits` | `push` to `main` | `notify-slack-push.yml` — clean commit message + SHA + author |
| `{name}-workflows` | CI workflow completes | `notify-slack-ci.yml` — pass/fail status |
| `{name}-metrics` | Daily cron (8 AM IST) | `daily-metrics.yml` → `scripts/daily-metrics.mjs` |
| `{name}-logs` | Sentry errors (TODO) | Needs Sentry project setup |
| `{name}-incidents` | Sentry critical (TODO) | Needs Sentry project setup |
| `{name}-chat` | Manual | No automation |

## Daily metrics

A GitHub Actions workflow (`.github/workflows/daily-metrics.yml`) runs at 8 AM IST daily.

**Script:** `scripts/daily-metrics.mjs` collects from:

| Source | Requires | Data |
|--------|----------|------|
| Vercel | `VERCEL_TOKEN` secret | Deployments, runtime errors |
| Cloudflare | `CLOUDFLARE_TOKEN` secret | Requests, bandwidth, threats, cache ratio |
| Google Analytics | `GA4_API_KEY` secret (TODO) | Sessions, page views, bounce rate |
| Meta Ads | `META_ADS_TOKEN` secret (TODO) | Impressions, clicks, spend |

**Setup:** Add these secrets on the **Production** environment (not repo-level):
- `VERCEL_TOKEN` — from [vercel.com/account/tokens](https://vercel.com/account/tokens)
- `CLOUDFLARE_TOKEN` — from [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) (needs `Zone > Analytics > Read`)
- `SLACK_BOT_TOKEN` — the `xoxb-...` bot token

**Manual run:** `gh workflow run daily-metrics.yml` or ask the agent.

## MCP config (global — already set)

```json
{
  "slack": {
    "type": "local",
    "command": ["npx", "-y", "@modelcontextprotocol/server-slack"],
    "environment": {
      "SLACK_BOT_TOKEN": "xoxb-...",
      "SLACK_TEAM_ID": "T0BJ6JLAJJH"
    }
  }
}
```

## Troubleshooting

- **`not_in_channel`**: Bot hasn't joined. Run `conversations.join` with the channel ID.
- **`missing_scope`**: Bot token missing required OAuth scope. Check scopes at api.slack.com/apps.
- **`invalid_auth`**: Token revoked or wrong workspace. Reinstall the app.
- **Channel limits**: Free Slack workspace caps at 10 channels. Archive unused ones before creating.

## Channel IDs (susegad)

```
susegaad-commits    C0BJ6K81D8D
susegaad-workflows  C0BJ3LGR14K
susegaad-logs       C0BJ3LG2YV9
susegaad-chat       C0BJ7U0FRHU
susegaad-incidents  C0BJ3UUGG5R
susegaad-metrics    C0BK4GL0C0Y
```
