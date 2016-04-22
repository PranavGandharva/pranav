function loadPlugin() {
        var confirmation = confirm("Continuing will open a new window to allow you to install the plugin. Once the plugin is installed please close out of all Internet Explorer windows and restart Rove.");
        if (confirmation) {
                window.open('http://www.google.com/chromeframe/eula.html', 'CFWindow', 'menubar=no,width=800,height=450,toolbar=no,scrollbars=yes')
        }
}
$(document).ready(function () {
                CFInstall.check({
                        node: "chrome_msg",
                        onmissing: function () {
                                $('body').prepend('<div id="chrome_msg">Rove requires capabilities not supported by your browser. Please install <a href="#" onClick="loadPlugin();">Google Chrome Frame Plugin</a>. <br /><br />Once you have installed the plugin please close all Internet Explorer windows and restart Rove.</div>');
                                $('#chrome_msg').slideDown(500)
                        },
                        preventPrompt: true,
                        oninstall: function () {
                                window.location.reload()
                        }
                })
});