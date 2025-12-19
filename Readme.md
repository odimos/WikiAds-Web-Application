# WikiAds Web Application

Web εφαρμογή μικρών αγγελιών που χρησιμοποιεί το WikiAps API για .

https://wikiads-web-application.onrender.com/

Χρήση του API της υπηρεσίας μικρών αγγελιών WikiAds για τη δημιουργία εφαρμογής που υποστηρίζει πλοήγηση σε κατηγορίες και υποκατηγορίες αγγελιών, προσθήκη αγγελιών στα αγαπημένα, 
προβολή αγαπημένων αγγελιών και φιλτράρισμα αγγελιών βάσει υποκατηγορίας.
Η εφαρμογή χρησιμοποιεί βάση δεδομένων mongoDB στην πλατφόρμα atlas.
Τα credentials για σύνδεση στη βάση δεδομένων δίνονται στο αρχείο ".env" που δεν αναρτάται δημόσια.

Χρήση του Web API της υπηρεσίας μικρών αγγελιών WikiAds, η οποία υποστηρίζει δημοσίευση
και αναζήτηση αγγελιών για διάφορες κατηγορίες προϊόντων και υπηρεσιών.

Για να γίνει κλήση στο WikiAds API χρησιμοποιείται το Fetch API. 
Η δυναμική παραγωγή κώδικα γίνεται με τη βιβλιοθήκη Handlebar. 

Ταυτοποίηση χρήστη:
Φόρμα ταυτοποίησης, Υποβολή μέσω Fetch API. 

WikiAds API:
Υποστηρίζει κλήσεις: 
GET /categories
GET /categories/:id/subcategories
GET /subcategories
GET /ads?subcategory={id}
GET /ads?category={id}
Επιστρέφει αποτελέσματα σε μορφή JSON

Η εμφάνιση των κατηγοριών καθώς και των αγγελιών κάθε κατηγορίας θα γίνεται με δυναμική παραγωγή HTML κώδικα και προσάρτησή του σε κατάλληλα σημεία των ιστοσελίδων. Η
παραγωγή HTML κώδικα θα γίνει με αξιοποίηση της βιβλιοθήκης Handlebars και κατάλληλων
HTML templates

Κήση στο WikiAds API, κατά την επιστροφή των αποτελεσμάτων promise[...].then( results -> ... )
η βιβλιοθήκη handlebars αναλαμβάνει με βάση τα αποτελέσματα να δημιουργήσει δυναμικά το νέο περιεγχόμενο

MongoDB (Atlas) <-MongoClient-> Server (Node.js + Express) <-Fetch API, HTTP request-> Client (Web Browser) <-Fetch API-> WikiAds API

REST API του server
GET /category , /subcategory , / favorites , / 
POST /login , /showFavorites , /logout
PUT /favorites
DELETE /favorites
Τα δεδομένα όπου υπάρχουν βρίσκονται στο body της κλήσης.

Port 3000

Κύριες Λειτουργίες
Πλοήγηση Αγγελιών
    Προβολή κατηγοριών & υποκατηγοριών
    Προβολή αγγελιών ανά κατηγορία ή υποκατηγορία
    Φιλτράρισμα αγγελιών ανά υποκατηγορία
Authentication
    Login μέσω HTML form
    Persistance loged in μέσω LocalStorage και Session
Login:
    Σϋνδεση και αποσύνδεση χρήστη, με δυνατότητα να παραμένει συνδεδεμένος
Favorites
    Προσθήκη/διαγραφή αγγελιών στα αγαπημένα του χρήστη
    με αποφυγή διπλοεγγραφών
    Προβολή λίστας αγαπημένων σε ξεχωριστή σελίδα
Δεδομένα
    Διατήρηση των πληροφοριών των χρηστών σε βάση δεδομένων

### Τεχνολογίες
Front-end: Html, CSS, JavaScript, Fetch API, handlebars library
Back-end (server): Node.js + express + uuid
Database: MongoDB (Atlas) with MongoDB driver (MongoClient)

Server -> REST API

Οι πληροφορίες του WikiAds αποκτώνται με μια κλήση Fetch API με τις αντίστοιχες παραμέτρους.

Το Φιλτράρισμα αγγελιών ανά υποκατηγορία δεν ξανα φορτώνει τις αγγελίες.
Το φιλτράρισμα λειτουργεί αλλάζωντας το display σε none όσων δεν ταιριάζουν με το φίλτρο.

Η σελίδα
favorite-ads.html, η οποία θα προβάλλει τις αγαπημένες αγγελίες ενός συγκεκριμένου χρήστη. Ο προσδιορισμός του χρήστη θα γίνεται με κατάλληλες παραμέτρους ερωτήματος στο URL
της σελίδας (πχ. favorite-ads.html?username=bzafiris&sessionId=1b9d6bcdbbfd-4b2d-9b5d-ab8dfbbd4bed). Κατά τη φόρτωση της favorite-ads.html, θα λαμβάνονται οι τιμές των παραμέτρων ερωτήματος με χρήση JavaScript κώδικα (αντίστοιχα με την ΠΧ
1) και θα υποβάλλεται αίτημα στο διακομιστή για λήψη της λίστας αγαπημένων αγγελιών του
χρήστη.

Κάθε φορά που ανοίγει μια σελίδα ο κλιεντ, ελέγχει αν υπάρχουν αποθηκευμένα δεδομένα στο LocalStorage 
για το session, και αν υπάρχουν τα στέλνει για να δει αν είναι έγκυρα κ ο χρήστης είναι συνδεδεμένος.

Login:
Fetch API για να σταλούν username και password στο server.
Ο server ελέγχει αν υπάχει εγγραφή με αυτό το συνδιασμό στη βάση δεδομένων, και αν ναι ανανεώνει το sessionId της εγγραφής με έναν τυχαίο κωδικό από το uuid, το οποίο και επιστρέφει.
Authentication: 
Ο Client αποθηκεύει στο LocalStorage το sessionId προκειμένου να κάνει authenticate τα αιτήματά του (πρόσθεση / αφαίρεση favorites)ν αλλά και να παραμένει συνδεδεμένος για κάποιο διάστημα χωρίς να χρειάζεται συνεχώς να βάζει το username και password.
Σε κάθε authentication ο Client στέλνει με Fetch API το όνομα χρήστη και το sessionId, για να ελεγχθεί αν αντιστοιχεί με κάποια εγγραφή στη βάση.

Η παραπάνω εφαρμογή πραγματοποιήθηκε στα πλαίσια της 2ης εργασίας του μαθήματος "Τεχνολογίες και Προγραμματισμός Εφαρμογών στον Ιστό". 
Σύμφωνα με σχολιαστές, θεωρείται η καλύτερη εργασία του 2024.

Debugging: Χρήση nodemon και we developer tools.

## Usage
Open the location on command line.  
Enter "node index.js" to start the server.  
If everything goes well you will see on cmd  
"You successfully connected to MongoDB!  
Listening to port:  3000"  
Go to localhost:3000 and enjoy the app!  

## Demo users

### Mitsos

- Username: mitsos
- Password: 123

### Vasso

- Username: vasso
- Password: 111

[Εκφώνηση](project.pdf)
