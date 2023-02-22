---
layout  : wikiindex
title   : Wiki
toc     : true
public  : true
comment : false
updated : 2023-02-22 20:21:13 +0900
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
    * [[2023-memo]]
    * [[2022-memo]]
    * [[2022-To-Do]]
* [[Study]]
    * [[C-lang]]
    * [[Rust]]
    * [[Git]]
    * [[Vim]]
    * [[Regex]]
    * [[Ubuntu]]
    * [[ADsP]]
    * [[incubating]]

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

