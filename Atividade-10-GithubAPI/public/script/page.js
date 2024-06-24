$(function(){
    setTimeout(function(){$(".loader").remove();}, 300);
    const urlId = getRepositoryId();
    $.get("https://api.github.com/repositories/" + urlId, function(repoData){
        $(".repo-tittle").html(repoData.name);
        const description = repoData.description == null ? "Nada cadastrado" : repoData.description;
        $(".repo-desc").html(description);
        $(".create-date").html(getRepoistoryCreatedDate(repoData.created_at));
        $(".programlang").html(repoData.language);
        $(".link-grades").html(repoData.html_url).attr({
            "href": repoData.html_url,
            "target": "_blank"
        });
    });
})

function getRepositoryId(){
    const pageUrl = window.location.href
    return new URL(pageUrl).searchParams.get("id");
}

function getRepoistoryCreatedDate(data){
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
}