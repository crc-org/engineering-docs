# Accessing the CRC cluster from the same LAN

Prerequisites: CRC running on a Linux machine, another machine on the same LAN wanting to access it.

## 1. On the CRC host — open firewall ports

```bash
sudo firewall-cmd --add-port=80/tcp --add-port=443/tcp --add-port=6443/tcp --permanent
sudo firewall-cmd --reload
```

## 2. On the CRC host — forward the API port

CRC exposes ports 80 and 443 on all interfaces, but the API server (6443) only listens on localhost. Create a socat forward:

Replace `YOUR_LAN_IP` with the CRC host's LAN IP (e.g. `192.168.1.6`).

```bash
sudo dnf install -y socat
```

```bash
cat <<'EOF' | sudo tee /etc/systemd/system/crc-api-forward.service
[Unit]
Description=Forward CRC API port (6443) to LAN
After=network.target

[Service]
ExecStart=/usr/bin/socat TCP-LISTEN:6443,bind=YOUR_LAN_IP,fork,reuseaddr TCP:127.0.0.1:6443
Restart=always

[Install]
WantedBy=multi-user.target
EOF
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now crc-api-forward
```


## 3. On the client machine — update /etc/hosts

```text
YOUR_LAN_IP api.crc.testing console-openshift-console.apps-crc.testing oauth-openshift.apps-crc.testing downloads-openshift-console.apps-crc.testing
canary-openshift-ingress-canary.apps-crc.testing default-route-openshift-image-registry.apps-crc.testing
```

## 4. Verify

Replace `<password>` with the kubeadmin password shown during `crc start` or obtain it via `crc console --credentials`.

```bash
oc login https://api.crc.testing:6443 -u kubeadmin -p <password>
oc get nodes
```
