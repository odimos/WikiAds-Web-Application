# WikiAds Web Application
*Τεχνολογίες και Προγραμματισμός Εφαρμογών στον Ιστό, Οικονομικό Πανεπιστήμιο Αθηνών 2024*

Web εφαρμογή για προβολή και αποθήκευση μικρών αγγελιών.
Τα δεδομένα των αγγελιών αντλούνται από το WikiAds API.
Οι χρήστες και οι προτιμήσεις τους αποθηκεύονται σε Βάση Δεδομένων MongoDB Atlas.
Το backend έχει υλοποιηθεί σε Node.js με Express και φιλοξενείται στο Render.com.

Η εφαρμογή επιτρέπει πλοήγηση στις αγγελίες και προσθήκη ή αφαίρεση αγγελιών από τα αγαπημένα για εγγεγραμμένους χρήστες.

## Live Preview

<a href="https://wikiads-web-application.onrender.com/" target="_blank">
🔗 https://wikiads-web-application.onrender.com/
</a>    
⚠️ Σημείωση:
Ο server που εξυπηρετεί το backend χρειάζεται λίγο χρόνο για να «ξυπνήσει» μετά το πρώτο άνοιγμα.
Το ίδιο ισχύει και για το WikiAds API.

## Demo users
- **Mitsos** — Username: `mitsos`, Password: `123`
- **Vasso** — Username: `vasso`, Password: `111`

## Κύριες Λειτουργίες

### Πλοήγηση Αγγελιών
- Προβολή κατηγοριών και υποκατηγοριών
- Προβολή αγγελιών ανά κατηγορία ή υποκατηγορία
- Φιλτράρισμα αγγελιών

### Authentication
- Login και logout
- Persistence logged-in μέσω LocalStorage και session

### Favorites
- Προσθήκη και διαγραφή αγγελιών στα αγαπημένα
- Αποφυγή διπλοεγγραφών
- Προβολή λίστας αγαπημένων

### Δεδομένα
- Αποθήκευση πληροφοριών χρηστών σε βάση δεδομένων


## Τεχνολογίες

### Front-end
- HTML  
- CSS  
- JavaScript  
- Fetch API  
- Handlebars.js  

### Back-end
- Node.js  
- Express  
- UUID  
- MongoDB Driver (MongoClient)  
- Hosted στο Render.com  

### Database
- MongoDB Atlas  


## Αρχιτεκτονική
```text
Client (Web Browser)
  ├─ Fetch API─────────→ WikiAds API
  │
  ├─ HTTP GET request ──→ Server (HTML)
  │
  └─ Fetch API ───────→ Server (Node.js + Express)
                           │
                           ├─ MongoDB Driver (MongoClient)
                           │
                           └─ MongoDB Atlas
```

### Περιγραφή

- Ο **Client (Web Browser)** :
  - χρησιμοποιεί το Fetch API απευθείας προς το WikiAds API για την ανάκτηση αγγελιών
  - χρησιμοποιεί το Fetch API προς τον Server για λειτουργίες authentication και διαχείρισης αγαπημένων
  - πραγματοποιεί HTTP GET requests προς τον Server για την αρχική φόρτωση HTML σελίδων

- Ο **Server**:
  - είναι υλοποιημένος σε Node.js με Express
  - εκθέτει REST API
  - επικοινωνεί με τη MongoDB Atlas μέσω του MongoClient

- Η **MongoDB Atlas** 
  - αποθηκεύει χρήστες, sessions και αγαπημένες αγγελίες

## WikiAds API

Χρήση του Web API της υπηρεσίας μικρών αγγελιών WikiAds, το οποίο επιστρέφει δεδομένα σε μορφή JSON.

### Υποστηριζόμενες κλήσεις
- `GET /categories`
- `GET /categories/:id/subcategories`
- `GET /subcategories`
- `GET /ads?subcategory={id}`
- `GET /ads?category={id}`

Η ανάκτηση των δεδομένων γίνεται με **Fetch API** και η εμφάνισή τους μέσω δυναμικής παραγωγής HTML με **Handlebars templates**.


## REST API Server

### GET
- `/category`
- `/subcategory`
- `/favorites`

### POST
- `/login`
- `/showFavorites`
- `/logout`

### PUT
- `/favorites`

### DELETE
- `/favorites`

Τα δεδομένα αποστέλλονται στο body των HTTP requests όπου απαιτείται.

## Authentication & Sessions

- Login μέσω HTML form και Fetch API
- Ο server ελέγχει τα credentials στη βάση δεδομένων
- Σε επιτυχή σύνδεση δημιουργείται νέο `sessionId` με χρήση UUID
- Το `sessionId` αποθηκεύεται στο LocalStorage
- Σε κάθε αίτημα που απαιτεί authentication αποστέλλονται `username` και `sessionId`
- Ο client ελέγχει κατά το άνοιγμα κάθε σελίδας αν υπάρχει ενεργό session


## Favorites

Η σελίδα `favorite-ads.html` προβάλλει τις αγαπημένες αγγελίες του χρήστη.

Ο προσδιορισμός του χρήστη γίνεται μέσω παραμέτρων URL, π.χ.:

```text
favorite-ads.html?username=mitsos&sessionId=xxxx
```

Ανάκτηση των παραμέτρων URL με JavaScript   
Αποστολή αιτήματος στον server για λήψη των αγαπημένων αγγελιών


## Φιλτράρισμα Αγγελιών

Το φιλτράρισμα αγγελιών ανά υποκατηγορία:
- Δεν επαναφορτώνει δεδομένα
- Υλοποιείται με αλλαγή του `display: none` σε αγγελίες που δεν ταιριάζουν στο φίλτρο


## Διαχείριση Δεδομένων

- Οι χρήστες και οι προτιμήσεις τους αποθηκεύονται στη MongoDB Atlas
- Τα credentials σύνδεσης βρίσκονται στο αρχείο `.env`, το οποίο δεν αναρτάται δημόσια

## Debugging & Development

- Nodemon
- Browser Developer Tools

## Local Usage

```bash
node index.js
```

## Επιχυτής εκκίνηση:
```text
You successfully connected to MongoDB!
Listening to port:  3000
```

Η εφαρμογή θα είναι διαθέσιμη εδώ:
http://localhost:3000

---

[Εκφώνηση της Εργασίας](project.pdf)
