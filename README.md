# Zorker Skills

An extensible skill catalog and zero-dependency command-line tool for selecting,
validating, installing, importing, and running reusable AI agent skills.

## Install

```bash
npm install --global @zorker/skills
```

Inspect the catalog and detect local agent directories:

```bash
zorker-skills list
zorker-skills detect
zorker-skills detect --scope project --project .
```

Global detection uses existing configuration or skills directories and known
agent commands on the executable search path. Project detection is deliberately
directory-based so a repository is changed only when it already declares an
agent, unless the user selects one explicitly.

Install a skill globally into every detected agent:

```bash
zorker-skills install ai-website-strategist --agent all
```

Import a skill into the current project:

```bash
zorker-skills import ai-website-strategist --agent codex
```

Use `--target <skills-directory>` for an agent not covered by a built-in
adapter. Existing, differing installations are never overwritten unless
`--force` is present; forced updates use a temporary backup and restore it if
copying fails.

## Included skills

`ai-website-strategist` plans, scores, scaffolds, and validates complete public
websites for enterprise AI products. Its source is deliberately vendor-neutral
and contains no competitive research, copied prose, source list, or secret.

```bash
zorker-skills run ai-website-strategist plan examples/brief.json --out build/plan
zorker-skills run ai-website-strategist score examples/audit.json --out build/report.json
zorker-skills run ai-website-strategist scaffold build/plan/site-plan.json --out build/site
zorker-skills run ai-website-strategist validate build/site
```

Package-local example paths live inside
`skills/ai-website-strategist/examples/`. Run the toolkit directly from a
checked-out repository when experimenting with those files.

`zorker-demo-remotion` guides cinematic brand films, product introductions,
functional demos, and tutorials across industries. It includes camera and
editing techniques, narrative patterns, a 30-second demo specification, and
frame-based production checks. When users specify an application's source,
the skill requires actual component imports or presentation-layer extraction,
not approximate replacement UI.

```bash
zorker-skills install zorker-demo-remotion --agent codex
zorker-skills import zorker-demo-remotion --agent codex
```

Invoke `$zorker-demo-remotion` in the receiving agent with the product brief
and source location. This is an instruction skill, not a standalone video
renderer, and does not register a CLI `run` command.

## Repository layout

```text
cli/
  bin/                 executable entry point
  src/                 catalog, detection, installation, and validation logic
  test/                CLI, installation, and package-content tests
skills/
  catalog.json         machine-readable skill registry
  catalog.schema.json  registry contract
  <skill>/             complete portable skill source
```

## Add a skill

1. Create `skills/<lowercase-hyphen-name>/SKILL.md` with `name` and
   `description` frontmatter.
2. Keep detailed material in `references/`, deterministic tools in `scripts/`,
   and schemas or templates in `assets/`.
3. Add one matching entry to `skills/catalog.json`.
4. Run `npm test`, `npm run validate`, and `npm pack --dry-run`.

## Publishing safely

Copy `.npmrc.example` to a location outside the package, export `NPM_TOKEN` for
the current process, and publish with that file as the user configuration. A
real token must never be committed or placed in a package archive.

## License

MIT
