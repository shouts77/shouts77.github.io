---
layout  : wikiindex
title   : Wiki
toc     : true
public  : true
comment : false
updated : 2023-07-29 07:29:54 +0900
regenerate: true
---

## Wiki items

* [[Project]]
    * [[Jupyterhub-Project]]
    * [[Vimwiki-Project]]
* [[Processing]]
    * [[Randomised-rectangle]]
    * [[Winter]]
* [[Diary]]
    * [[2023-memo4]]
    * [[2023-memo3]]
    * [[2023-memo2]]
    * [[2023-memo1]]
 [[Study]]
    * [[C-lang]]
    * [[Rust]]
    * [[Git]]
    * [[Vim]]
    * [[Regex]]
    * [[Ubuntu]]
    * [[ADsP]]
    * [[incubating]]
* [[Archive]]
    * [[2023년]]
        * [[2023-memo]]
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

