# mdcv

Converts a Markdown resume to a styled PDF using Playwright (headless Chromium).

## Requirements

- Node.js
- Playwright Chromium browser (`npx playwright install chromium`)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install the Playwright browser:

   ```bash
   npx playwright install chromium
   ```

3. Copy the example config and fill in your values:

   ```bash
   cp src/config/config.example.json src/config/config.json
   ```

   Edit `src/config/config.json`:

   ```json
   {
     "inputFile": "input/resume.md",
     "outputFile": "output/Your-Name-Resume.pdf",
     "htmlTitle": "Your Name | Your Title"
   }
   ```

   > `config.json` is gitignored and will not be committed.

4. Place your resume in the input directory:

   ```
   src/input/resume.md
   ```

## Usage

```bash
	docker run --rm -v "$(pwd)/src:/work" -w /work mcr.microsoft.com/playwright:v1.59.0-jammy \
		bash -c "npm install marked playwright && node render.js"
```

The PDF will be written to the path specified in `outputFile`.

## License

Apache 2.0
