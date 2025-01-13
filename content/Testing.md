Testing
=======


## Running e2e tests

We have automated e2e tests which ensure the quality of our deliverable; CRC, and system bundle.


### Introduction

End-to-end (e2e) tests borrow code from [Clicumber](http://github.com/crc-org/clicumber) package to provide basic functionality for testing CLI binaries. This facilitates running commands in a persistent shell instance (`bash`, `tcsh`, `zsh`, Command Prompt, or PowerShell), assert its outputs (standard output, standard error, or exit code), check configuration files, and so on. The general functionality of Clicumber is then extended by CRC specific test code to cover the whole functionality of CRC.

### How to run

First, one needs to set the following flags in `Makefile`, under `e2e` target:

  - `--pull-secret-file`  
    absolute path to your OpenShift pull secret.    
  - `--bundle-location`  
    if bundle is embedded, this flag should be set to `--bundle-location=embedded` or not passed at all  
    if bundle is not embedded, then absolute path to the bundle should be passed
  - `--crc-binary`  
    if `crc` binary resides in `$GOPATH/bin`, then this flag does not need to be passed  
    otherwise absolute path to the `crc` binary should be passed.

To start e2e tests, run:

```bash
$ make e2e
```

#### How to run only a subset of all e2e tests


Implicitly, all e2e tests for your operating system are executed. If you want to run only tests from one feature file, you have to override `GODOG_OPTS` environment variable. For example:

```bash
make e2e GODOG_OPTS="--godog.tags='@basic && @windows'" BUNDLE_LOCATION="--bundle-location=<bundle location>" PULL_SECRET_FILE="--pull-secret-file=<pull secret path>"
```

Please notice `@basic && @windows`, where `@basic` tag stands for `basic.feature` file and `@windows` tag for e2e tests designed for Windows.

### How to test cert rotation

On linux platform first stop the network time sync using:

```bash
$ sudo timedatectl set-ntp off
```

Set the time 2 month ahead:

```bash
$ sudo date -s '2 month'
```

Start the crc with `CRC_DEBUG_ENABLE_STOP_NTP=true` set:

```bash
$ CRC_DEBUG_ENABLE_STOP_NTP=true crc start
```

### Logs

Test logs can be found in `test/e2e/out/test-results`.
