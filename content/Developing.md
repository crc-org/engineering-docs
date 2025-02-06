Developing CRC
==============

  
## Overview

The following sections describe how to build and test the project.

## Prerequisites

-   `git`
-   `make`
-   A recent Go distribution (>=1.11)
    

> [!NOTE]
> You should be able to develop the project on Linux, Windows, or macOS.


## Setting up the development environment

### Cloning the repository

Get the sources from GitHub:

```
$ git clone https://github.com/crc-org/crc.git
```

> [!NOTE]
> Do not keep the source code in your `$GOPATH`, as [Go modules](https://github.com/golang/go/wiki/Modules) will cause `make` to fail.


## Dependency management

CRC uses [Go modules](https://github.com/golang/go/wiki/Modules) for dependency management.

For more information, see the following:

1.  [Introduction to Go modules](https://github.com/golang/go/wiki/Modules)
2.  [Using Go modules](https://blog.golang.org/using-go-modules)
    

## Compiling the CRC Binary

In order to compile the crc executable for your local platform, run the following command:

```bash
$ make
```

By default, the above command will place the crc executable in the `$GOBIN` path.

Run the following command to cross-compile the crc executable for many platforms:

```bash
$ make cross
```

**Note**: This command will output the cross-compiled crc executable(s) in the `out` directory by default:

```bash
$ tree out/
out/
├── linux-amd64
│   └── crc
├── macos-amd64
│   └── crc
└── windows-amd64
    └── crc.exe
```


## Running unit tests

To run all unit test use:

```bash
$ make test
```

If you need to update mocks use:

```bash
$ make generate_mocks
```

## Troubleshooting errors when running unit tests via IDE

When running tests from IDE, you might encounter this error:

```shell
pkg-config --cflags -- gpgme
Package gpgme was not found in the pkg-config search path.
Perhaps you should add the directory containing `gpgme.pc'
to the PKG_CONFIG_PATH environment variable
No package 'gpgme' found
pkg-config: exit status 1
```

In order to resolve this you need to install [gpgme](https://github.com/proglottis/gpgme)

### Installing gpgme on Linux

You need to install `libgpgme-dev` using your Linux distribution's package installer tool (`dnf`/`apt`)

Here is an example for Fedora:
```shell
sudo dnf -y install libgpgme-dev
```

### Installing gpgme on MacOS

You need to install `gpgme` on macOS.

Here is an example using homebrew:
```shell
brew install gpgme
```
