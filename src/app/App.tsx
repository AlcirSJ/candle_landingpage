import {
  Flame,
  Sparkles,
  Heart,
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState, type ComponentType } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel"; // Ensure the path matches the file structure

const FlameIcon = Flame as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;
const SparklesIcon = Sparkles as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;
const HeartIcon = Heart as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;
const ShoppingBagIcon = ShoppingBag as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;
const ArrowRightIcon = ArrowRight as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;

const MinusIcon = Minus as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;

const PlusIcon = Plus as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;

const Trash2Icon = Trash2 as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;

const ShoppingCartIcon = ShoppingCart as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;

const WhatsAppIcon = MessageCircle as unknown as ComponentType<{
  size?: number;
  className?: string;
}>;

interface Product {
  name: string;
  price: string;
  image: string;
  description: string;
  gradient: string;
  weight: string;
  suggestedPlaces: string[];
}

interface CartItem extends Product {
  quantity: number;
}

export function App() {
  const products = [
    {
      name: "Sonhos de Baunilha",
      price: "R$ 89",
      image:
        "https://images.unsplash.com/photo-1707839568431-c2648f6d5184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Baunilha quente com toques de âmbar",
      gradient: "from-amber-100 to-orange-100",
      weight: "300g",
      suggestedPlaces: ["Cama", "Sofá", "Cantinho de Leitura"],
    },
    {
      name: "Alegria Cítrica",
      price: "R$ 79",
      image:
        "https://images.unsplash.com/photo-1707839568443-912e7206c726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Toranja fresca e bergamota",
      gradient: "from-yellow-100 to-pink-100",
      weight: "250g",
      suggestedPlaces: ["Cama", "Sofá", "Cantinho de Leitura"],
    },
    {
      name: "Branco Minimalista",
      price: "R$ 95",
      image:
        "https://images.unsplash.com/photo-1707839568871-7c18453668ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Algodão puro e chá branco",
      gradient: "from-slate-100 to-neutral-100",
      weight: "350g",
      suggestedPlaces: ["Cama", "Sofá", "Cantinho de Leitura"],
    },
    {
      name: "Coleção Luxo",
      price: "R$ 115",
      image:
        "https://images.unsplash.com/photo-1707839568938-f9b50bb88454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Blend exclusivo de botânicos raros",
      gradient: "from-purple-100 to-pink-100",
      weight: "400g",
      suggestedPlaces: ["Cama", "Sofá", "Cantinho de Leitura"],
    },
  ];

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const getQuantity = (index: number) => quantities[index] || 1;

  const increaseQuantity = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 1) + 1,
    }));
  };

  const decreaseQuantity = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) - 1),
    }));
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.name === product.name,
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const handleAddToCart = (product: Product, index: number) => {
    const quantity = getQuantity(index);
    addToCart(product, quantity);

    // Display a simple pop-up message
    const popup = document.createElement("div");
    popup.textContent = `${product.name} foi adicionado ao carrinho!`;
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.backgroundColor = "#333";
    popup.style.color = "#fff";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    popup.style.zIndex = "1000";
    popup.style.opacity = "1";
    popup.style.transition = "opacity 0.5s ease";

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => document.body.removeChild(popup), 500);
    }, 2000);
  };

  const [cart, setCart] = useState<CartItem[]>([]);

  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

  const updateCartQuantity = (productName: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === productName
          ? { ...item, quantity: Math.max(newQuantity, 1) }
          : item,
      ),
    );
  };

  const finalizePurchase = () => {
    const phoneNumber = "5519999999999"; // Substitua pelo número desejado
    const productList = cart
      .map((item) => `${item.name} (Quantidade: ${item.quantity})`)
      .join("\n"); // Quebra de linha para WhatsApp
    const total = calculateTotal();
    const message = `Olá, gostaria de finalizar minha compra com os seguintes itens:\n${productList}\n\nTotal: R$ ${total}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) =>
          total +
          parseFloat(item.price.replace("R$", "").trim()) * item.quantity,
        0,
      )
      .toFixed(2);
  };

  const features = [
    {
      icon: FlameIcon,
      title: "Feitas à Mão",
      description:
        "Cada vela é cuidadosamente produzida por artesãos qualificados",
      gradient: "from-orange-400 to-pink-400",
    },
    {
      icon: SparklesIcon,
      title: "Cera de Soja Premium",
      description:
        "100% cera de soja natural para uma queima limpa e duradoura",
      gradient: "from-purple-400 to-indigo-400",
    },
    {
      icon: HeartIcon,
      title: "Ecologicamente Correto",
      description: "Embalagem sustentável e ingredientes de origem ética",
      gradient: "from-emerald-400 to-teal-400",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="size-full overflow-y-auto bg-gradient-to-br from-stone-50 via-white to-amber-50">
      {/* Floating Nav */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-full shadow-lg border border-neutral-200/50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-8">
          <button
            className="text-lg tracking-tight cursor-pointer bg-transparent border-none p-0"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shantii
          </button>
          <div className="flex gap-6 text-sm text-neutral-600">
            <button
              className="hover:text-neutral-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Loja
            </button>
            <button
              className="hover:text-neutral-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("aboutUs")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Sobre
            </button>
            <button
              className="hover:text-neutral-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("footer")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contato
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-32 overflow-hidden"
      >
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], x: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        <motion.div
          className="relative z-10 text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full border border-amber-200/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm text-amber-900">Feitas com Amor</span>
          </motion.div>
          <motion.h1
            className="text-7xl md:text-8xl mb-8 tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-amber-900 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ilumine Seu
            <br />
            Espaço
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-12 text-neutral-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Velas artesanais que transformam qualquer ambiente em um santuário
            de calor e tranquilidade
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button className="group bg-gradient-to-r from-neutral-900 to-neutral-800 text-white px-10 py-5 rounded-full hover:shadow-2xl hover:shadow-neutral-900/20 transition-all duration-300 inline-flex items-center gap-3">
              <ShoppingBagIcon size={20} />
              Ver Coleção
              <ArrowRightIcon
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button className="px-10 py-5 rounded-full border-2 border-neutral-300 hover:border-neutral-900 transition-all duration-300">
              Explorar Aromas
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Product Preview */}
        <motion.div
          className="absolute bottom-32 right-10 hidden lg:block"
          initial={{ opacity: 0, x: 100, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative group"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/50 to-orange-400/50 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative w-64 h-80 rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1707839568483-9f1924d5f5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                alt="Vela em destaque"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-amber-900"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl mb-6 text-white">
              Feitas com Perfeição
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              Cada detalhe importa na criação do ambiente perfeito
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10"
                  style={{
                    background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                  }}
                ></div>
                <div className="relative bg-white/60 backdrop-blur-sm p-10 rounded-3xl border border-neutral-200/50 hover:border-neutral-300 transition-all duration-500 hover:shadow-xl group-hover:-translate-y-2">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl mb-4 text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl mb-6 bg-gradient-to-br from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
              Nossa Coleção
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Cada vela é uma experiência sensorial única
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative mb-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                  ></div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={() => openProductModal(product)}
                  >
                    <span className="text-sm">Ver Detalhes</span>
                  </div>
                </div>
                <h3 className="text-xl mb-2 text-neutral-900">
                  {product.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-3 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-lg text-neutral-900 mb-4">{product.price}</p>

                <div className="flex items-center gap-3 mb-3">
                  <button
                    onClick={() => decreaseQuantity(index)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center justify-center"
                  >
                    <MinusIcon size={16} />
                  </button>
                  <span className="text-lg min-w-[2rem] text-center">
                    {getQuantity(index)}
                  </span>
                  <button
                    onClick={() => increaseQuantity(index)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center justify-center"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(product, index)}
                  className="w-full bg-neutral-900 text-white py-3 rounded-full hover:bg-neutral-800 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBagIcon size={16} />
                  Adicionar ao Carrinho
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-900"
              onClick={closeProductModal}
            >
              Fechar
            </button>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">
              {selectedProduct.name}
            </h2>
            <p className="text-neutral-600 mb-4">
              {selectedProduct.description}
            </p>
            <p className="text-neutral-600 mb-4">
              Peso: {selectedProduct.weight}
            </p>
            <p className="text-neutral-600 mb-4">
              Locais indicados: {selectedProduct.suggestedPlaces}
            </p>
          </div>
        </div>
      )}

      {/* About Us Section */}
      <section id="aboutUs" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-amber-900"></div>
        <motion.div
          className="relative max-w-4xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl mb-8 tracking-tight">
            Sobre Nós
          </h2>
          <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Na Shantii, acreditamos que cada vela conta uma história. Nossas
            velas são feitas à mão com materiais sustentáveis e um toque de
            amor, para transformar qualquer espaço em um refúgio de paz e
            tranquilidade.
          </p>
          <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Junte-se a nós nesta jornada de criar ambientes acolhedores e cheios
            de significado.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="py-16 px-4 bg-neutral-950 text-neutral-400 text-center"
      >
        <div className="mb-6">
          <span className="text-2xl text-white tracking-tight">Shantii</span>
        </div>
        <p className="text-sm mb-4">
          &copy; 2026 Shantii Candles. Feitas com carinho.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm">Contato: contato@sitevela.com</p>
          <p className="text-sm flex items-center gap-2">
            Telefone:
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 flex items-center gap-1"
            >
              <WhatsAppIcon size={16} />
              (11) 99999-9999
            </a>
          </p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-neutral-900 text-neutral-100 shadow-lg p-6 w-96 transform transition-transform duration-300 z-50 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-xl font-bold mb-4 text-neutral-50">Carrinho</h2>
        {cart.length > 0 ? (
          <div>
            <ul className="mb-4">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between mb-2"
                >
                  <div>
                    <p className="font-medium text-neutral-50">{item.name}</p>
                    <p className="text-sm text-neutral-400">
                      Preço Unitário: {item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.name, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors flex items-center justify-center"
                      >
                        <MinusIcon size={16} className="text-neutral-50" />
                      </button>
                      <span className="text-neutral-50">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.name, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors flex items-center justify-center"
                      >
                        <PlusIcon size={16} className="text-neutral-50" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium text-neutral-50">
                      Subtotal: R${" "}
                      {(
                        parseFloat(item.price.replace("R$", "").trim()) *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                    <button
                      onClick={() =>
                        setCart((prevCart) =>
                          prevCart.filter((_, i) => i !== index),
                        )
                      }
                      className="text-red-500 hover:text-red-700 transition-colors flex items-center justify-center"
                    >
                      <Trash2Icon size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-neutral-700 pt-4">
              <p className="text-lg font-bold text-neutral-50">
                Valor Total: R$ {calculateTotal()}
              </p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full mb-2"
              onClick={finalizePurchase}
            >
              Finalizar Compra
            </button>
          </div>
        ) : (
          <p className="text-neutral-400 mb-4">Seu carrinho está vazio.</p>
        )}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors w-full"
          onClick={() => setIsCartOpen(false)}
        >
          Fechar
        </button>
      </div>

      {/* Cart Button */}
      <button
        className="fixed bottom-4 right-4 bg-neutral-900 text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors z-40 flex items-center justify-center gap-2"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCartIcon size={20} />
        Ver Carrinho
      </button>
    </div>
  );
}

export default App;
