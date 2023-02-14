import { Product } from "../config/db.js"
// @Desc Add product
const addProduct = async (req, res) => {
  const {
    productName,
    description,
    quantity,
    available,
  } = req.body;

  try {
    let checkExist = await Product.findOne({ where: { productName: productName } });
    if (checkExist) {
      res.status(400).json({ Message: "Produit exist déja !" });
    } else {

      const product = await Product.create({
        productName: productName,
        description: description,
        quantity: quantity,
        available: available
      });
      if (product) {

        res.status(200).json({ Message: "Produit ajoutée" });
      }
    }
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

// @Desc delete Product by id
const deleteProductByID = async (req, res) => {
  try {
    let product = await Product.findOne({ where: { id: req.params.id } })
    if (!product) {
      res.status(404).json({ Message: "Produit introuvable" });
    } else {
      if (product) {
        let result = await Product.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Produit supprimée" })
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Server Error" });
  }
};

// @Desc get list Products
const getListProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ Message: "Server Error" });
  }

}

// @Desc update product
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findOne({ where: { id: req.params.id } })
    if (product) {
      await Product.update(req.body, { where: { id: req.params.id } })
      res.status(200).json({ Message: "Produit modifiée" });
    } else {
      res.status(400).json({ Message: "Produit introuvable" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ Message: error.message });
  }
}


export { addProduct, deleteProductByID, getListProducts, updateProduct }