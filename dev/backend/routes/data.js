// ====================================================
// libraries
var fs    = require('fs');
var upath = require('upath');
var path  = require('path');

// ====================================================
// db
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var db;
var MONGODB_URL = "mongodb://localhost:27017/"
var COLLECTION_NAME = "Hallock_activity_kiosk"
// var COLLECTION_NAME = "Hallock_community_directory"
MongoClient.connect(MONGODB_URL + COLLECTION_NAME, {native_parser:true}, function(err, _db) {
  assert.equal(null, err);
  db = _db;
});

// ====================================================
// routing
var express = require('express');
var router = express.Router();

// API to get general settings ------------------------
router.get('/general-settings', function(req, res, next) {
  // fetch data from db
  db.collection('general_settings').find().toArray(function(err, documents) {
    assert.equal(null, err);

    // return to a client
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(documents[0]));
  });
});

// API to get activities
router.get('/activities', function(req, res, next) {
  // fetch data from db
  db.collection('activities').find().toArray(function(err, documents) {
    assert.equal(null, err);

    // return to a client
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(documents));
  });
});

// API to get image URIs
router.get('/images', function(req, res, next) {
  // fetch data from db
  db.collection('media').find().toArray(function(err, documents) {
    assert.equal(null, err);

    // return to a client
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(documents));
  });
});

// API to post general settings ------------------------
router.post('/general-settings', function(req, res, next) {
  var generalSettings = req.body.generalSettings
  console.log('id: ', generalSettings._id)
  // update data in db
  db.collection('general_settings').update(
    {_id: new ObjectId(generalSettings._id)},
    {
      $set: {
        design_theme: generalSettings.design_theme,
        kiosk_title: generalSettings.kiosk_title,
        kiosk_title_2: generalSettings.kiosk_title_2,
        background_color: generalSettings.background_color,
        text_color: generalSettings.text_color,
        background_color_inverted: generalSettings.background_color_inverted,
        text_color_inverted: generalSettings.text_color_inverted,
        show_logo: generalSettings.show_logo,
        park_logo_uri: generalSettings.park_logo_uri,
        bg_image_home_uri: generalSettings.bg_image_home_uri,
        bg_image_detail_uri: generalSettings.bg_image_detail_uri,
        timeout_in_second: generalSettings.timeout_in_second
      }
    },
    {upsert: false},
    function (err, result) {
      if (err) throw err;

      console.log('general settings has been successfully updated!')

      db.collection('general_settings').find().toArray(function(err, documents) {
        assert.equal(null, err);

        // return to a client
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(documents[0]));
      });
    }
  );
});

// API to post general settings ------------------------
router.post('/activities', function(req, res, next) {
  var promises = []
  for (var i = 0; i < req.body.activities.length; i++) {
    promises.push(new Promise(function(resolve, reject) {
        updateActivity(resolve, req.body.activities[i])
      })
    );
  }

  Promise.all(promises)
    .then(function(result){
      console.log('all activities have been successfully updated!')
      db.collection('activities').find().toArray(function(err, documents) {
        assert.equal(null, err);

        // return to a client
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(documents[0]));
      });
    })
    .catch(function(err){
      // return to a client
      res.setHeader('Content-Type', 'application/json');
      res.send({result: err});
    })

  function updateActivity (resolve, activity) {
    // update data in db
    db.collection('activities').update(
      {_id: new ObjectId(activity._id)},
      {
        $set: {
          activity_id:    activity.activity_id,
          main_color:     activity.main_color,
          sub_color:      activity.sub_color,
          button_label:   activity.button_label,
          page_title:     activity.page_title,
          white_icon_uri: activity.white_icon_uri,
          color_icon_uri: activity.color_icon_uri,
          contents:       activity.contents
        }
      },
      {upsert: true},
      function (err, result) {
        if (err) throw err;
        console.log(new ObjectId())
        resolve() // resolve a promise
      }
    );
  }
});


// API to post a new image file ------------------------

// middleware to parse images
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.resolve('../public/static/imgs/'))
    cb(null, path.resolve('public/static/imgs/'))
  },
  filename: function (req, file, cb) {
    // set a new file name...
    var newFileName = '';

    // reserve the extension name
    var ext = path.extname(file.originalname)

    // trim the file extensition
    newFileName = upath.trimExt(file.originalname)

    // calc the current UNIX time stamp in sec
    var timestamp = Math.floor(Date.now() / 1000)

    // append the timestamp to the end
    newFileName += '_' + timestamp

    // bring the extension back to the file name
    newFileName += ext

    console.log('new file name generated: ', newFileName)

    // rename
    cb(null, newFileName)
  }
});

var upload = multer({storage: storage}).single('image')

router.post('/images', function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err)
      return
    }

    console.log('received an image file: ', req.file);
    var trimmed = upath.trimExt(req.file.path);
    var lastUnderscoreIndex = trimmed.lastIndexOf('_');
    var timestamp = trimmed.substring(lastUnderscoreIndex + 1);

    // update data in db
    db.collection('media').insert(
      {
        filename:  req.file.filename,
        timestamp: timestamp,
        filesize:  req.file.size
      },
      function (err, result) {
        if (err) throw err;

        console.log('a new image data has been successfully added!')

        // fetch data from db
        db.collection('media').find().toArray(function(err, documents) {
          assert.equal(null, err);

          // return to a client
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(documents));
        });
      }
    );
  });
});

// API to delete a image file ------------------------
router.post('/images/delete', function(req, res, next) {
  let item = req.body
  console.log('received a media item to delete: ', item);

  db.collection('media').remove(
    {
      _id: new ObjectId(item._id)
    },
    function (err, result) {
      if (err) throw err;

      console.log('an image data has been successfully removed!')

      // fetch data from db
      db.collection('media').find().toArray(function(err, documents) {
        assert.equal(null, err);

        // return to a client
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(documents));
      });
    }
  )
})

module.exports = router;
