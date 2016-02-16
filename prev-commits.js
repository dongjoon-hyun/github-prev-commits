function add_commits(index, html) {
    var author = $('.name')[0].href.substr(19); // Remove the Github prefix url.
    var repo = html.trim();
    var href = "https://github.com/" + repo + "/commits?author=" + author;
    var id = repo.replace("/","_");
    $.ajax({
        url: this.href + "/graphs/contributors-data",
        success: function(data) {
            // Find author's data.
            var filtered = data.filter(function (item) {
                return item.author.login == author; }
            );
            if (filtered.length == 0) { // Author has no previous commits.
                $("." + id).remove();
            } else { // Show the previous commits.
                $("." + id).text(filtered[0].total + " prev. commits");
            }
        }
    });
    // Append placeholder.
    return "<a class='" + id + "' href='" + href + "'>0 commits</a>";
}

$(".issue-nwo-link").after(add_commits);
