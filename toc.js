// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Disclaimer</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.</strong> Development</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="Developing.html"><strong aria-hidden="true">1.1.</strong> Developing</a></li><li class="chapter-item expanded "><a href="Debugging.html"><strong aria-hidden="true">1.2.</strong> Debugging</a></li><li class="chapter-item expanded "><a href="Testing.html"><strong aria-hidden="true">1.3.</strong> Testing</a></li><li class="chapter-item expanded "><a href="Releasing.html"><strong aria-hidden="true">1.4.</strong> Releasing</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.</strong> Installation</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="macOS-code-signing.html"><strong aria-hidden="true">2.1.</strong> macOS code signing</a></li><li class="chapter-item expanded "><a href="Windows-installation.html"><strong aria-hidden="true">2.2.</strong> Windows installation process</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> Networking</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="Usermode-networking-stack.html"><strong aria-hidden="true">3.1.</strong> User-mode network stack</a></li><li class="chapter-item expanded "><a href="Blocking-traffic-with-nwfilter.html"><strong aria-hidden="true">3.2.</strong> Blocking traffic with nwfilter</a></li><li class="chapter-item expanded "><a href="Using-tcpconnect-to-track-TCP-proxy-connections.html"><strong aria-hidden="true">3.3.</strong> Using tcpconnect to track TCP proxy connections</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.</strong> Virtualization</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="Nested-virtualization-setup.html"><strong aria-hidden="true">4.1.</strong> Nested virtualization setup</a></li><li class="chapter-item expanded "><a href="Apple-Silicon-Support.html"><strong aria-hidden="true">4.2.</strong> Apple Silicon support</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.</strong> User guide</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="Add-another-user-to-cluster.html"><strong aria-hidden="true">5.1.</strong> Add another user to the cluster</a></li><li class="chapter-item expanded "><a href="Add-mirror-registry.html"><strong aria-hidden="true">5.2.</strong> Add mirror registry</a></li><li class="chapter-item expanded "><a href="Adding-a-self-signed-certificate-registry.html"><strong aria-hidden="true">5.3.</strong> Add a self-signed certrificate registry</a></li><li class="chapter-item expanded "><a href="Adding-an-insecure-registry.html"><strong aria-hidden="true">5.4.</strong> Add an insecure registry</a></li><li class="chapter-item expanded "><a href="Change-the-domain-for-CRC.html"><strong aria-hidden="true">5.5.</strong> Change the domain for CRC</a></li><li class="chapter-item expanded "><a href="Custom-CA-cert-for-proxy.html"><strong aria-hidden="true">5.6.</strong> Custom CA cert for proxy</a></li><li class="chapter-item expanded "><a href="Dynamic-volume-provisioning.html"><strong aria-hidden="true">5.7.</strong> Dynamic Volume provisioning</a></li><li class="chapter-item expanded "><a href="Fails-to-add-the-user-to-the-libvirt-group-Fedora-Silverblue.html"><strong aria-hidden="true">5.8.</strong> Fails to add the user to the libvirt group</a></li><li class="chapter-item expanded "><a href="Podman-support.html"><strong aria-hidden="true">5.9.</strong> Podman support</a></li><li class="chapter-item expanded "><a href="Using-ko-with-CRC-exposed-registry.html"><strong aria-hidden="true">5.10.</strong> Using ko with CRC exposed registry</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
