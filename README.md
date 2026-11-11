# COMP_3612_A2
COMP 3612 Assignment 2 - Parth S. & Ty W.

# CSS Framework
[Tailwind CSS](https://tailwindcss.com/docs/installation/tailwind-cli) using the **Tailwind CLI**.\
Following setup instructions from the link above, simply keep the terminal open while you are working. Anytime the `index.html` is saved, Tailwind CLI will recompile the CSS.\
## Setting up development environment
1. Install [Tailwind CSS](https://tailwindcss.com/docs/installation/tailwind-cli) using the instructions at the link
2. In the IDE of your choice, run the following command in your terminal: `npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch`
3. Repeat step 2 whenever you start a new work session

# General Class Naming Conventions in Markup
Since Tailwind CSS can result in very long class lists. We may want to use classes to generate node lists, so we must add class names to our elements. Generally, if there is a possibility of that elemenet appearing more than once on the page, give it a class and an ID.\
For example, in the **Featured Products** tab I have given each card the ID of `product-[num]` and a class of `card`. So if we needed, we can target every card by calling `document.querySelectorAll("#product-cards card")` to get a node list of every card stored in the `featured-products` div.\
No strict rules, but it is probably going to make things easier to give stuff an ID and a class name to describe what that element's purpose holds.\
**NOTE:** My class names are always *before* any Tailwind CSS class. This is so we can easily pick out what our custom names are amongst the Tailwind styling. 

# Categories in the Data
- Beauty
- Fragrances
- Furniture
- Groceries
- Home Decoration
- Kitchen Accessories
- Laptops
- Mens Shirts
- Mens Shoes
- Mens Watches
- Mobile Accessories
## Potential Groupings
| Home | Mens | Tech | Groceries | Cosmetics and Personal Care |
|------ |------|------|-----------|-----------------------------|
| Furniture | Mens Shirts | Laptops | | Beauty |
| Home Decoration | Mens Shoes | Mobile Accessories| | Fragrances |
| Kitchen Accessories | Mens Watches |