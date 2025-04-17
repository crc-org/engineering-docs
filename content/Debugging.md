Debugging guide
===============


`crc start` failed and you don't know where to go next. This guide will help you find clue about the failure.

## Access the VM

First, check if the VM is running and if you can enter it.
With this following `ssh-config`, enter the VM. The IP can be found with `crc ip`.

`~/.ssh/config`
```ssh-config
Host crc
    Hostname 127.0.0.1
    Port 2222
    User core
    IdentityFile ~/.crc/machines/crc/id_ecdsa
    IdentityFile ~/.crc/machines/crc/id_ed25519
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null

```

If you use user network mode, the IP is 127.0.0.1 and the port is 2222.
If you use system network mode on Linux, the IP is 192.168.130.1 and the port is 22.
On Windows, the relevant SSH keys is in `C:\Users\%USERNAME%\.crc\machines\crc\id_ed25519`

You can also run directly this command:

#### Linux/macOS
```bash
$ ssh -i ~/.crc/machines/crc/id_ed25519 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p 2222 core@127.0.0.1
```

#### Windows
```powershell
PS> ssh -i C:\Users\$env:USERNAME\.crc\machines\crc\id_ed25519 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p 2222 core@127.0.0.1
```

## Checking the status of the VM

First, you can check you have internet connectivity with `curl https://quay.io`. 

A working `kubeconfig` is stored in `/opt/kubeconfig`. You can use it to get the status of the cluster.

```bash
$  KUBECONFIG=/opt/kubeconfig kubectl get co
NAME                                       VERSION   AVAILABLE   PROGRESSING   DEGRADED   SINCE
authentication                             4.6.9     True        False         False      8h
cloud-credential                           4.6.9     True        False         False      11d
cluster-autoscaler                         4.6.9     True        False         False      11d
config-operator                            4.6.9     True        False         False      11d
console                                    4.6.9     True        False         False      11d
```

> [!NOTE]
> They should all look like this

```bash
$  KUBECONFIG=/opt/kubeconfig kubectl get nodes
NAME                 STATUS   ROLES           AGE   VERSION
crc-lf65c-master-0   Ready    master,worker   11d   v1.19.0+7070803
(should be ready)

KUBECONFIG=/opt/kubeconfig kubectl describe nodes
...
Conditions:
  Type             Status  LastHeartbeatTime                 LastTransitionTime                Reason                       Message
  ----             ------  -----------------                 ------------------                ------                       -------
  MemoryPressure   False   Mon, 25 Jan 2021 18:55:15 +0000   Fri, 15 Jan 2021 02:46:01 +0000   KubeletHasSufficientMemory   kubelet has sufficient memory available
  DiskPressure     False   Mon, 25 Jan 2021 18:55:15 +0000   Fri, 15 Jan 2021 02:46:01 +0000   KubeletHasNoDiskPressure     kubelet has no disk pressure
  PIDPressure      False   Mon, 25 Jan 2021 18:55:15 +0000   Fri, 15 Jan 2021 02:46:01 +0000   KubeletHasSufficientPID      kubelet has sufficient PID available
  Ready            True    Mon, 25 Jan 2021 18:55:15 +0000   Fri, 15 Jan 2021 02:46:11 +0000   KubeletReady                 kubelet is posting ready status
...
```

> [!NOTE]
> Conditions should all be like this

```bash
$  KUBECONFIG=/opt/kubeconfig kubectl get pods -A
NAMESPACE                                    NAME                                                     READY   STATUS      RESTARTS   AGE
openshift-apiserver-operator                 openshift-apiserver-operator-5677877bdf-8g6bm            1/1     Running     0          11d
openshift-apiserver                          apiserver-66f58cdf9f-d96bp                               2/2     Running     0          10d
openshift-authentication-operator            authentication-operator-76548bccd7-dq9g5                 1/1     Running     0          11d
openshift-authentication                     oauth-openshift-5744c7c4bd-mnz8g                         1/1     Running     0          10d
openshift-authentication                     oauth-openshift-5744c7c4bd-vnwms                         1/1     Running     0          10d
openshift-cluster-machine-approver           machine-approver-7f5c9dc658-rfr8k                        2/2     Running     0          11d
openshift-cluster-node-tuning-operator       cluster-node-tuning-operator-76bf4c756-6llzh             1/1     Running     0          11d
```

> [!NOTE]
> Look for suspicious failed pod
 
If you still have no clue, you can take a look at container activity. 

```bash
$ sudo crictl ps | head
CONTAINER           IMAGE                                                                                                                                           CREATED             STATE               NAME                                          ATTEMPT             POD ID
7021ae2801875       registry.redhat.io/redhat/redhat-operator-index@sha256:6519ef7cef0601786e6956372abba556da20570ba03f43866dd1b7582043b061                         15 minutes ago      Running             registry-server                               0                   cfcfe4356e368
53a1204ae4473       registry.redhat.io/redhat/community-operator-index@sha256:2bae3ba4b7acebf810770cbb7444d14b6b90226a0f53dfd453ca1509ea6aa5e0                      3 hours ago         Running             registry-server                               0                   175e5557785eb
4609e49599e21       cfce721939963e593158b60ab6d1e16278a4c4e681d305af6124e978be6a3687                                                                                8 hours ago         Running             controller                                    1                   8d05bd4f82250
```

> [!NOTE]
> The first container started 15min ago where almost all containers started few hours ago. This is suspicious.
