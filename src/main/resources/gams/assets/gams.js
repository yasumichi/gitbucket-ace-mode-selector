(function () {
    console.log("GitBucket Ace Mode Selector Plugin loaded.");

    window.addEventListener('load',() => {
        const editorTag = document.getElementById('editor');
        if (editorTag == null) {
            console.log("Editor not found, exiting.");
        }
        const th = document.querySelector('.table th');
        /*
        const theme = document.getElementById('theme');
        const pullRight = theme.parentElement;
        */
        const pullRight = document.createElement('div');
        pullRight.className = "pull-right";
        const select = document.createElement('select');
        select.id = "aceKeyMode";
        select.className = "form-control";
        const optGroup = document.createElement('optgroup');
        optGroup.setAttribute('label', "Keyboard");

        const keyBindings = {
            "Default": "",
            "Emacs": "ace/keyboard/emacs",
            "Vim": "ace/keyboard/vim"
        };

        Object.keys(keyBindings).forEach(key => {
            let option = document.createElement('option');
            option.setAttribute('value', keyBindings[key]);
            option.textContent = key
            optGroup.appendChild(option);
        });

        select.appendChild(optGroup);
        pullRight.appendChild(select);
        th.appendChild(pullRight);

        var waitAce = setInterval(() => {
            var aceGutter = document.querySelector('.ace_gutter');
            if (aceGutter != null) {
                clearInterval(waitAce);
                const editor = ace.edit(editorTag);
                var aceKeyMode = localStorage.getItem("aceKeyMode") || "";
                select.value = aceKeyMode;
                editor.setKeyboardHandler(aceKeyMode == "" ? null : aceKeyMode);
                select.addEventListener('change', () => {
                    editor.setKeyboardHandler(select.value == "" ? null : select.value);
                    localStorage.setItem("aceKeyMode", select.value);
                },true)
            }
        }, 100)
    }, true);
})();