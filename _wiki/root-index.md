---
layout  : wikiindex
title   : Wiki
toc     : true
public  : true
comment : false
updated : 2022-12-21 11:30:22 +0900
regenerate: true
---

## Wiki items

* [[Project]]
    * [[Jupyterhub-Project]]
    * [[Vimwiki-Project]]
* [[Diary]]
    * [[2022-memo]]
    * [[2022-To-Do]]
* [[Study]]
    * [[C-lang]]
    * [[Git]]
    * [[Vim]]
    * [[Regex]]
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

