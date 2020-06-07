var colours = {

    '#colour1': $("#colour1").val(),
    '#colour2': $("#colour2").val(),
    '#colour3': $("#colour3").val(),
    '#colour4': $("#colour4").val(),

}

function hideShow(changed, selected) {

    const tags = ["#colour1", "#colour2", "#colour3", "#colour4"];

    if (selected != colours[changed]) {

        for (let i = 0; i < tags.length; i++) {

            if (tags[i] != changed) $(tags[i] + " option[value=" + selected + "]").hide();
            if (tags[i] != changed) $(tags[i] + " option[value=" + colours[changed] + "]").show();
            $(tags[i] + " option[value=nothing]").show();
        }
        colours[changed] = selected;
    }
}

$(document).ready(function() {
    $("#colour1").change(function() {

        let selected = $(this).children("option:selected").val();
        let changed = "#colour1";
        hideShow(changed, selected);

    });

    $("#colour2").change(function() {

        let selected = $(this).children("option:selected").val();
        let changed = "#colour2";
        hideShow(changed, selected);

    });

    $("#colour3").change(function() {

        let selected = $(this).children("option:selected").val();
        let changed = "#colour3";
        hideShow(changed, selected);

    });

    $("#colour4").change(function() {

        let selected = $(this).children("option:selected").val();
        let changed = "#colour4";
        hideShow(changed, selected);

    });
});