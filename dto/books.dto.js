class IssuedBook{
    _id;
    name;
    genere;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;


    constructor(users) {
        this._id = users.issuedBook._id;
        this.name = users.issuedBook.name;
        this.genere = users.issuedBook.genere;
        this.price = users.issuedBook.price;
        this.publisher = users.issuedBook.publisher;
        this.issuedBy = users.issuedBy;
        this.issuedDate = users.issuedDate;
        this.returnDate = users.returnDate;
    }
}

export default IssuedBook