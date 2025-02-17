---
layout  : wikiindex
title   : Wiki
toc     : true
public  : true
comment : false
updated : 2025-02-18 07:33:44 +0900
regenerate: true
---

## Wiki items

* [[Project]]
    * [[jupyterhub-project]]
    * [[vimwiki-project]]
* [[Processing]]
    * [[randomised-rectangle]]
    * [[winter]]
* [[Diary]]
    * [[2025-memo1]]
    * [[2024-memo1]]
    * [[2023-memo4]]
    * [[2023-memo3]]
    * [[2023-memo2]]
    * [[2023-memo1]]
* [[Book-Media]]
    * [[2025-book-media]] 
* [[Study]]
    * [[c-lang]]
    * [[rust]]
    * [[git]]
    * [[vim]]
    * [[regex]]
    * [[ubuntu]]
   * [[incubating]]
* [[Archive]]
    * [[2024년]]
    * [[2023년]]
        * [[2023-memo]]
        * [[adsp]]
    * [[2022년]]
        * [[2022-memo]]
        * [[2022-To-Do]]


---

## Blog posts
<div>
    <ul>
{% for post in site.posts %}
    {% if post.public != false %}
        <li>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title }}
            </a>
        </li>
    {% endif %}
{% endfor %}
    </ul>
</div>

