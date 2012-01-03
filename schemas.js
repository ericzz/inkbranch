var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;


var Address = new Schema({
    addr1     : String
  , addr2     : String
  , city      : String
  , state     : String
  , zip       : String
  , phone     : String
});
mongoose.model('Address', Address);
  

var Style = new Schema({
    id        : ObjectId // 
  , name      : String   // name of style
  , graphic   : String   // URL to image
  , email     : String   // email/username of style creator
});
mongoose.model('Style', Style);


var Item = new Schema({
    qty       : Number   // quantity being ordered
  , product   : String   // the product ordered (paper, quality type)
  , style     : ObjectId    // style object referring to items style
});
mongoose.model('Item', Item);

var Order = new Schema({
    id            : ObjectId    //
  , date          : Date        // date of order
  , address       : ObjectId     // ship to address object
  , status        : String      // cart/payment/shipment status
  , items         : [Item]      // items in order
  , payment       : String      // payment metadata
  , email         : String      // email/username of customer
});
mongoose.model('Order', Order);


var User = new Schema({
    id         : ObjectId // 
  , email      : String   // email/username
  , password   : String   // hashed password
  , address    : ObjectId  // saved shipping address
});
mongoose.model('User', User);