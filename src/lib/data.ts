import { z } from "zod";

export const PRODUCT_CATEGORIES = [
  "Conveying Systems",
  "Mixing Systems",
  "Filling Systems",
  "Storage & Feeding",
  "Engineering Solutions"
] as const;

export const PRODUCTS = [
  {
    id: "z-bucket-elevator",
    name: "Z Bucket Elevator",
    slug: "z-bucket-elevator",
    category: "Conveying Systems",
    shortDescription: "Z-path bucket elevator for vertical and horizontal material transfer in compact spaces.",
    description: "The Z Bucket Elevator is engineered for applications requiring both vertical lift and horizontal discharge without additional conveying equipment. Its Z-shaped path delivers material precisely where needed while maintaining a minimal footprint.",
    image: "/images/products/z-bucket-elevator.png",
    features: ["Dual-direction material travel", "Compact Z-path layout", "Self-cleaning boot section", "Anti-runback device"],
    specifications: {
      "Lift Height": "11.5 feet",
      "Capacity": "5-6 Ton per Hour",
      "Bucket Material": "Food Grade",
      "Body Type": "MS / SS",
      "Customisation": "Yes"
    },
    applications: ["Grain handling", "Fertilizer plants", "Food processing", "Chemical plants"]
  },
  {
    id: "inclined-bucket-elevator",
    name: "Inclined Bucket Elevator",
    slug: "inclined-bucket-elevator",
    category: "Conveying Systems",
    shortDescription: "Heavy-duty inclined bucket elevator for continuous bulk material elevation.",
    description: "Designed for reliable continuous elevation of granular and free-flowing bulk materials at inclined angles. Features a robust casing and precisely engineered buckets for maximum throughput efficiency and minimal spillage.",
    image: "/images/products/inclined-bucket-elevator.png",
    features: ["High vertical lift", "Self-cleaning boot", "Dust extraction ports", "Anti-runback device"],
    specifications: {
      "Lift Height": "7.5 / 8 feet",
      "Capacity": "2-3 Ton per Hour",
      "Bucket Material": "Food Grade",
      "Body Type": "MS / SS",
      "Customisation": "Yes"
    },
    applications: ["Agricultural silos", "Fertilizer plants", "Mining operations", "Food grains"]
  },
  {
    id: "screw-conveyor",
    name: "Screw Conveyor",
    slug: "screw-conveyor",
    category: "Conveying Systems",
    shortDescription: "Enclosed auger systems for dust-free transport of powders and granules.",
    description: "Ideal for conveying sluggish or semi-fluid materials. The enclosed tubular or U-trough design ensures dust-tight operation, protecting both the product and the environment.",
    image: "/images/products/screw-conveyor.png",
    features: ["Dust-tight enclosure", "Variable pitch flights", "Heavy-duty bearings", "Easy maintenance access"],
    specifications: {
      "Diameter": "Customisable",
      "Height": "7.5 / 8 feet",
      "Body Type": "MS / SS",
      "Customisation": "Yes"
    },
    applications: ["Cement processing", "Spices handling", "Pharmaceutical powders", "Chemical dosing"]
  },
  {
    id: "ribbon-blender",
    name: "Ribbon Blender",
    slug: "ribbon-blender",
    category: "Mixing Systems",
    shortDescription: "Homogeneous powder and granule mixing with double helical ribbons.",
    description: "Provides highly efficient, uniform mixing of dry powders, granules, and viscous pastes. The double ribbon agitator creates a multi-directional flow for rapid blending.",
    image: "/images/products/ribbon-blender.png",
    features: ["Double helical ribbons", "Pneumatic discharge valve", "Jacketed design available", "Safety interlocks"],
    specifications: {
      "Gear Box": "30:1",
      "Working Volume": "150 kg - 200 kg",
      "MOC": "MS / SS",
      "Customisation": "Yes"
    },
    applications: ["Nutraceuticals", "Spices blending", "Cosmetic powders", "Agrochemicals"]
  },
  {
    id: "tow-conveyor",
    name: "Toy Conveyor",
    slug: "tow-conveyor",
    category: "Conveying Systems",
    shortDescription: "Floor-mounted toy conveyor for in-plant material movement and assembly operations.",
    description: "The Toy Conveyor provides efficient in-floor or overhead towing of trolleys and carts across production floors. Designed for high-frequency repetitive material transport with minimal manual intervention.",
    image: "/images/products/tow-conveyor.png",
    features: ["Continuous in-floor chain", "Heavy load capacity", "Low maintenance design", "Custom track layouts"],
    specifications: {
      "Load Capacity": "20 gr - 30 gr",
      "Speed": "Drive / Gear Box",
      "Customisation": "Yes"
    },
    applications: ["Assembly lines", "Paint shop conveying", "Warehouse transport", "Heavy component handling"]
  },
  {
    id: "belt-conveyor",
    name: "Belt Conveyor",
    slug: "belt-conveyor",
    category: "Conveying Systems",
    shortDescription: "High-efficiency belt conveyor systems for continuous material handling.",
    description: "Our Belt Conveyors are engineered for reliable, continuous transport of bulk materials and unit loads. Designed with precision to handle heavy-duty industrial applications with minimal maintenance.",
    image: "/images/products/belt-conveyor.png",
    features: ["Variable speed control", "Heavy-duty steel frame", "Anti-static belt options", "Low noise operation"],
    specifications: {
      "Belt Width": "Customized",
      "Capacity": "100 / 250 kg",
      "Material": "MS / SS",
      "Power": "0.5 HP to 3 HP",
      "Customisation": "Yes"
    },
    applications: ["Assembly lines", "Packaging sorting", "Bulk material transfer", "Warehouse logistics"]
  },
  {
    id: "modular-belt-conveyor",
    name: "Modular Belt Conveyor",
    slug: "modular-belt-conveyor",
    category: "Conveying Systems",
    shortDescription: "Versatile, easy-to-clean modular belt conveyors ideal for food and pharma.",
    description: "Constructed with interlocking plastic modules, these conveyors offer superior flexibility and hygiene. Perfect for applications requiring frequent cleaning, cooling, or drainage.",
    image: "/images/products/modular-belt-conveyor.png",
    features: ["FDA approved materials", "Easy segment replacement", "High drainage capacity", "Corrosion resistant"],
    specifications: {
      "Belt Type": "Customised",
      "Temperature Range": "Up to 50°C",
      "Frame Material": "MS / SS",
      "Drive": "According to Requirement",
      "Customisation": "Yes"
    },
    applications: ["Food processing", "Beverage bottling", "Pharmaceutical packaging", "Cooling lines"]
  },
  {
    id: "auger-filler",
    name: "Auger Filler",
    slug: "auger-filler",
    category: "Filling Systems",
    shortDescription: "Precision volumetric filling for free-flowing and non-free-flowing powders.",
    description: "Servo-driven auger filling system that guarantees high accuracy and repeatability. Suitable for filling bottles, jars, and pouches with powders and fine granules.",
    image: "/images/products/auger-filler.png",
    features: ["Servo motor drive", "PLC controlled HMI", "Tool-less auger change", "Weight feedback loop"],
    specifications: {
      "Fill Weight": "5 gr - 1000 gr",
      "Speed": "Up to 50 fills/min",
      "Hopper Capacity": "Customised",
      "Customisation": "Yes"
    },
    applications: ["Protein powders", "Coffee packaging", "Pharmaceutical dry syrups", "Baking powder"]
  },
  {
    id: "hoppers",
    name: "Hoppers",
    slug: "hoppers",
    category: "Storage & Feeding",
    shortDescription: "Custom-engineered storage hoppers and surge bins for consistent material buffer.",
    description: "Robust storage solutions designed to maintain consistent material flow to downstream equipment. Available with agitators or vibrators for difficult materials.",
    image: "/images/products/hoppers.png",
    features: ["Mass flow design", "Level sensors integration", "Optional flow aids", "Sanitary finish available"],
    specifications: {
      "Capacity": "Customised",
      "Shape": "Square / Round",
      "Material": "SS",
      "Customisation": "Yes"
    },
    applications: ["Buffer storage", "Batch dosing", "Silo discharge", "Packaging feed"]
  },
  {
    id: "platforms",
    name: "Platforms",
    slug: "platforms",
    category: "Engineering Solutions",
    shortDescription: "Heavy-duty structural platforms and access structures for industrial plants.",
    description: "Custom fabricated structural platforms ensuring safe access and sturdy support for heavy machinery, silos, and elevated equipment.",
    image: "/images/products/platforms.png",
    features: ["Safety compliant railings", "Anti-slip grating", "Modular assembly", "High load-bearing capacity"],
    specifications: {
      "Load Capacity": "Around 700 kg",
      "Material": "MS / SS",
      "Platform Size": "5 ft x 5 ft",
      "Customisation": "Yes"
    },
    applications: ["Equipment mezzanine", "Maintenance access", "Silo support", "Plant walkways"]
  }
];

export const INDUSTRIES = [
  {
    id: "food-processing",
    name: "Food Processing",
    slug: "food-processing",
    description: "Hygienic, FDA-compliant equipment designed for safe and efficient food handling, from grains to processed snacks.",
    image: "/images/industries/industry-food.png",
    keyProducts: ["modular-belt-conveyor", "inclined-bucket-elevator", "ribbon-blender"]
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical",
    slug: "pharmaceutical",
    description: "High-precision, sanitary execution machinery meeting strict cGMP standards for drug manufacturing.",
    image: "/images/industries/industry-pharma.png",
    keyProducts: ["auger-filler", "screw-conveyor", "ribbon-blender"]
  },
  {
    id: "packaging",
    name: "Packaging",
    slug: "packaging",
    description: "High-speed conveying and feeding systems integrated seamlessly with secondary and end-of-line packaging machines.",
    image: "/images/industries/industry-packaging.png",
    keyProducts: ["belt-conveyor", "hoppers", "auger-filler"]
  },
  {
    id: "chemical",
    name: "Chemical",
    slug: "chemical",
    description: "Corrosion-resistant, heavy-duty material handling solutions for aggressive powders and granules.",
    image: "/images/industries/industry-chemical.png",
    keyProducts: ["screw-conveyor", "z-bucket-elevator", "platforms"]
  },
  {
    id: "cosmetic",
    name: "Cosmetic",
    slug: "cosmetic",
    description: "Gentle blending and precision filling systems for powders, creams, and personal care products.",
    image: "/images/industries/industry-cosmetic.png",
    keyProducts: ["ribbon-blender", "auger-filler", "modular-belt-conveyor"]
  },
  {
    id: "nutraceutical",
    name: "Nutraceutical",
    slug: "nutraceutical",
    description: "Advanced mixing and conveying solutions maintaining the integrity of sensitive dietary supplements.",
    image: "/images/industries/industry-nutra.png",
    keyProducts: ["ribbon-blender", "auger-filler", "hoppers"]
  },
  {
    id: "dairy",
    name: "Dairy",
    slug: "dairy",
    description: "Sanitary stainless steel equipment engineered for milk powders and dairy by-product processing.",
    image: "/images/industries/industry-dairy.png",
    keyProducts: ["screw-conveyor", "hoppers", "auger-filler"]
  },
  {
    id: "agriculture",
    name: "Agriculture",
    slug: "agriculture",
    description: "Robust, high-capacity material handling systems for grains, seeds, and fertilizers.",
    image: "/images/industries/industry-agri.png",
    keyProducts: ["z-bucket-elevator", "belt-conveyor", "inclined-bucket-elevator"]
  }
];

export const COMPANY_INFO = {
  name: "FABMACS INNOVATION",
  phone: "+91 9354900604",
  email: "info@fabmacs.com",
  address: "Plot No. 18, 16/6 Mathura Road, Old Faridabad, Haryana, India"
};
