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

Address
  .virtual('condensed')
  .get(function() {
    return this.addr1 + ', ' + this.addr2 + ', ' + this.city + ', ' + this.state + ' ' + this.zip;
  });
  

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

// Will billing address be needed as well?
var Order = new Schema({
    id            : ObjectId    //
  , order         : String      // our own generated order id
  , date          : Date        // date of order
  , address       : ObjectId    // ship to address object
  , status        : String      // cart/payment/shipment status
  , items         : [Item]      // items in order
  , payment       : String      // payment metadata
  , email         : String      // email/username of customer
});
mongoose.model('Order', Order);

Order
  .virtual('shipto')
  .get(function() {
    Address.findById(this.address, function(err, address) {
      if (!err) {
        return address.condensed;
      } else {
        // An address was never given.
      }
    });
  });


