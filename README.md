Engineering documentation for CRC
=================================

This repository contains the engineering documentation for the CRC project.

The documentation is written in markdown and is intended to be read and written
by any tool that supports markdown. However, the documentation is best viewed
using VS Code, Obsidian, or GitHub

The following diagrams plugins are used in this documentation:
 - Mermaid
 - Excalidraw


## Contents

  - [Start here](./content/SUMMARY.md)


## Usage instructions
You can open this repo on GitHub to read, use the GitHub Pages for a published version, or use an editor.
For example, it is easy to use `.` to start the GitHub Web Editor to read and edit these files.


### Build using container
To create the HTML output, you can use:

```
$ podman run --rm -v $PWD:/workspace ghcr.io/crc-org/mdbook:latest build
```

This will create a `book` folder that contains the output for a static webpage like GitHub Pages.


### Devcontainer
You can also use the devcontainer setup. This will start the generation container and allows you to use the `mdbook` command line directly from inside the editor.

This can be started from CodeSpaces, VS Code or the CLI
```shell
$ npm install -g @devcontainers/cli
$ devcontainer up --workspace-folder .
```

After the container has been started, you can use `mdbook build` to generate the output, and `mdbook serve` to open a preview using the forward of port 3000.
