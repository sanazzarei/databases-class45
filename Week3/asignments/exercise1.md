### What columns violate 1NF?
food_code and food_description contain multiple values violating the first normal form (1NF).
### What entities do you recognize that could be extracted?
member, dinner, venue, and food could be extracted as separate entities.
### Name all the tables and columns that would make a 3NF compliant solution.

Member table:

Columns: member_id (Primary Key), member_name, member_address

----------------------
Dinner table:

Columns: dinner_id (Primary Key), dinner_date

---------------------
Venue table:

Columns: venue_code (Primary Key), venue_description

------------------------
Food table:

Columns: food_code (Primary Key), food_description

-----------------------
Member_Dinner table:

Columns: member_id (Foreign Key referencing Member table), dinner_id (Foreign Key referencing Dinner table)
