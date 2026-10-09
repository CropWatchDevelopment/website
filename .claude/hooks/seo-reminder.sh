#!/usr/bin/env bash
# PostToolUse (Edit|Write) hook: when page content changes, remind Claude to
# keep the SEO artifacts in sync (see "SEO artifacts must stay in sync" in
# CLAUDE.md). Non-blocking: it only injects context.
f="$(jq -r '.tool_input.file_path // .tool_response.filePath // empty')"
case "$f" in
  */src/routes/*/+page.svelte|*/src/routes/+page.svelte|*/src/lib/content/*|*/static/news/*.json|*/src/lib/components/*/*.svelte)
    rel="${f#"$CLAUDE_PROJECT_DIR"/}"
    jq -n --arg f "$rel" '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: ("SEO sync: you changed content in " + $f + ". Before finishing, update in the same commit if affected: src/lib/seo/pages.ts (summary + bump lastmod; feeds /sitemap.xml and /llms.txt), the page <Seo> title/description, src/lib/seo/schema.ts JSON-LD if prices/products/org facts/FAQ changed, src/lib/content/columns.ts for コラム (dateModified), and alternates.ts PAIRS (identical on both branches) for new cross-site pages. Then run the unit tests (npx vitest --run --project server).")}}'
    ;;
esac
exit 0
