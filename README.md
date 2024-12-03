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


## Build instructions
To create the HTML output, you can use:

```
$ podman run --rm -v $PWD:/workspace quay.io/crc-org/mdbook:0.4.43 build
```

This will create a `book` folder that contains the output for a static webpage like GitHub Pages.
