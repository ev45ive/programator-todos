git clone adres-waszego-forka katalog
cd katalog

# Załaduj pliki z master do katalogu / przełacz mnie na gałaz master
git checkout master

# Dodaj zdalne repo o nazwie 'placki' i adresie ...
git remote add placki https://github.com/ev45ive/programator-todos.git

# Pobierz z repo 'placki' gałąź master tutaj
git pull placki master

# Wprowadz zmiany w kodzie, a potem...
utworz... src/pages/imie.js

# Stworz roboczą gałąź 
git checkout -b page_twojeimie

# Dodaj zmiany
git add src/
git status

# Stwórz commit ze zmianami + opis:
git commit -m "Moja strona - IMIE"

# Wyślij zmiany na forka (-u ustaw jako upstream / domyślną zdalną gałąź )
git push -u origin page_twojeimie

git push

