const express = require("express");
const toursController = require("../controllers/tour.controller");
const viewCount = require("../middleware/viewCount");


const router = express.Router();


router
  .route("/tours")
  /**
   * @api {get} /tours Get All Tours
   * @apiDescription Get all tours details
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} All user
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(toursController.getAllTours)
    .post(toursController.addTour)
    router 
        .route("/tour/trending")
          /**
       * @api {patch} /tour/trending Top 3 trending tour
       * @apiDescription Top 3 trending tour based on views
       * @apiPermission admin
       *
       * @apiHeader {String} Authorization   User's access token
       *
       * @apiParam  {Number{1-}}         [page=1]     List page
       * @apiParam  {Number{1-100}}      [limit=10]  Users per page
       *
       * @apiSuccess {Object[]} Tours
       *
       * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
       * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
       */
        .get(toursController.trending);
    
    router 
        .route("/tour/cheapest")
          /**
       * @api {patch} /user/bulk-update Update Multiple Users
       * @apiDescription Update multiple specific user details
       * @apiPermission admin
       *
       * @apiHeader {String} Authorization   User's access token
       *
       * @apiParam  {Number{1-}}         [page=1]     List page
       * @apiParam  {Number{1-100}}      [limit=10]  Users per page
       *
       * @apiSuccess {Object[]} Upadate multiple users.
       *
       * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
       * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
       */
        .get(toursController.cheapest);
router
  .route("/tours/:id")
    /**
   * @api {get} /user/all All Users
   * @apiDescription Get all user's details
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} All users.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(viewCount,toursController.getOneTour)

router
    .route("/tour/:id")
      /**
   * @api {post} /user/save Save User
   * @apiDescription Post a user's details
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} Save user.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
    .patch(toursController.updateTour)

module.exports = router;