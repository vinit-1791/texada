1. Clone the Git repo in apache htdocs folder
2. Create a database with name 'texada' in your database server and import texada.sql file in it
3. Access index.html using browser and you can use application from there

I have used soft delete for deleting products where is_active property of product is marked as 0 and home page list only shows product which have is_active 1

I am not serving the server explicitly on other port, so we can run the application by default on http:80

I have used a ready-to-use CodeIgniter REST API which I have used in previous projects and modified it as per our needs. Controllers are under controller/api
