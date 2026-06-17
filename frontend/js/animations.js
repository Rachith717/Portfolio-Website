const hiddenElements =
document.querySelectorAll(".hidden");

const observer =
new IntersectionObserver(entries =>
{
    entries.forEach(entry =>
    {
        if(entry.isIntersecting)
        {
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach(el =>
{
    observer.observe(el);
});

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){
        loader.style.display = "none";
    }

});