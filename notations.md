Копия hacker news - https://news.ycombinator.com/
Логотип сайта - текст, ссылка которая будет ввести на '/'
New - Ссылка, которая будет ввести на newest
Past - 'past' (возможность выбора по дню, делается через URL)

App

Blocks:

- News
- Past
- Commments
- Ask
- People profile
- From page(filter)

  In block:

  - Button of raising the rating (onClick add unvote)
  - Title (Link on another page)
  - Website (-> from page with a filter)
  - Number of points
  - Username (-> People profile)
  - Unvote button
  - Hide button(On reload window show)
  - Number comments (-> comments page)

Comments: - Block (copy) - Comments

    In comment:
      - Button of raising the rating (onClick add unvote)
      - Username(Link on profile)
      - time ago
      - unvote(on vote)
      - next (On click scroll to next comment current level)
      - minimize button on click comments down lvl minimized and current comment
        Print '[number] more '
        Can be work on one comment
        Before reload minimized remains

    If comment not root:
      - Standart comment
      - Root(if lvl > 2)
      - Parent (scroll to parent comment)

- People profile
