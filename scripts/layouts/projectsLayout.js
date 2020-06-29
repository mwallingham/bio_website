var listItems = document.getElementsByClassName("project");

console.log($(project).children)

Object.entries(listItems).forEach(project => {

    console.log(project);

});

console.log(listItems[0].children);