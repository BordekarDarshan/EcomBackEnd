// Latest Product By Page.

router.get("/latestproduct/:page", async (req, res) => {
  let perpage = 2;
  let getpage = req.params.page;
  let latestProduct = await prom.productModel
    .find()
    .sort("-recordDate")
    .skip(perpage * getpage - perpage)
    .limit(perpage);
  let totaldatacount = await prom.productModel.find({}).countDocuments();
  let totalpage = Math.ceil(totaldatacount / perpage);
  res.send({
    PerPage_Records: perpage,
    Page_No: getpage,
    Data: latestProduct,
    TotolCountData: totaldatacount,
    TotalPages: totalpage
  });
});

//Get Product by Page

router.get("/allproduct/page/:page", async (req, res) => {
  let perpage = 1;
  let getpage = req.params.page || 1;
  let data = await pm.productModel
    .find({})
    .skip(perpage * getpage - perpage)
    .limit(perpage);
  let totaldatacount = await pm.productModel.find({}).count();
  let totalpage = Math.ceil(totaldatacount / perpage);
  res.send({
    PerPage_Records: perpage,
    Page_No: getpage,
    Record: data,
    TotolCountData: totaldatacount,
    TotalPages: totalpage
  });
});

/*-----------------------------------------------Pagination------------------------------------------------------- */

//Get Product by Subcategory Using PageIndex.

router.get("/allproduct/subcategory/:subid/page/:page", async (req, res) => {
  let perpage = 2;
  let getpage = req.params.page || 1;
  let sub = await pm.subcategoryModel.findById(req.params.subid);
  let data = await pm.productModel
    .find({ subcategory: sub.subcategory })
    .skip(perpage * getpage - perpage)
    .limit(perpage);
  let totaldatacount = await pm.productModel.find({}).countDocuments();
  let totalpage = Math.ceil(totaldatacount / perpage);
  res.send({
    PerPage_Records: perpage,
    Page_No: getpage,
    Record: data,
    TotolCountData: totaldatacount,
    TotalPages: totalpage
  });
});

module.exports = router;

router.get("/category/:cat/subcategory/:sub/page/:page", async (req, res) => {
  let perpage = 2;
  let getpage = req.params.page;
  let cat = await pm.categoryModel.findById(req.params.cat);
  let sub = await pm.subcategoryModel.findById(req.params.sub);
  let data = await pm.productModel
    .find({
      category: cat.category,
      subcategory: sub.subcategory
    })
    .skip(perpage * getpage - perpage)
    .limit(perpage);
  let totaldatacount = await pm.productModel
    .find({
      category: cat.category,
      subcategory: sub.subcategory
    })
    .countDocuments();
  let totalpage = Math.ceil(totaldatacount / perpage);
  res.send({
    PerPage_Records: perpage,
    Page_No: getpage,
    Record: data,
    TotolCountData: totaldatacount,
    TotalPages: totalpage
  });
});

//Get Category By Page.

router.get("/allcat/page/:page", async (req, res) => {
  let perpage = 2;
  let getpage = req.params.page || 1;
  let data = await pm.categoryModel
    .find({})
    .select("category")
    .skip(perpage * getpage - perpage)
    .limit(perpage);
  let totaldatacount = await pm.categoryModel.find({}).count();
  let toptalpages = Math.ceil(totaldatacount / perpage);
  res.send({
    PerPage_Records: perpage,
    Page_No: getpage,
    Record: data,
    TotolCountData: totaldatacount,
    TotalPages: toptalpages
  });
});

//Get SubCategory By Page.

router.get("/allsubcat/page/:page", async (req, res) => {
  let perpage = 2;
  let getpage = req.params.page || 1;
  let data = await pm.subcategoryModel
    .find()
    .select("subcategory")
    .skip(perpage * getpage - perpage)
    .limit(perpage);
  let totaldatacount = await pm.subcategoryModel.find({}).count();
  let toptalpages = Math.ceil(totaldatacount / perpage);
  res.send({
    PerPage_Records: perpage,
    Page_No: getpage,
    Record: data,
    TotolCountData: totaldatacount,
    TotalPages: toptalpages
  });
});
