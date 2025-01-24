// app/checkout/page.js
"use client";

import { useState } from "react";
import StepProgress from "./components/StepProgress";
import ContactForm from "./components/ContactForm";
import DeliveryDetails from "./components/DeliveryDetails";
import BackendSwitchingClient from "../components/BackendSwitchingClient";
import OrderSummary from "./components/OrderSummary";
import { useCart } from "../components/CartContent";
import axios from "axios";
import InvoiceDownloaded from "./InvoiceDownloaded";
import MessageModal from "../components/MessageComponent";
import { useRouter } from "next/navigation";


const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const [download, setDownload] = useState(false);
  const [error, setError] = useState(false);
  const { cart, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    contact: "",
    state: "",
    busStop: "",
    deliveryCompany: "",
    pickupLocation: "",
    orderId: null,
  });


  const mappedData = {
    Abia: {
        Aba: {
          GIG: "No 5 Asa Road Former/Old Nitel Building Aba",
        },
        "Aba 2": {
          GIG: "G.R.A 30 Brass Street after Jevinic Restaurant Aba",
        },
        Umuahia: {
          GIG: "8 Mission Hill, Opposite Villaroy Hotel, Umuahia Main Town",
          GUO: "50 mission hill opposite Gado hotels and beside governor Dr Okezie Ikpeazu  campaign office Umuahia",
        },
        "Umuahia 2": {
          GIG: "No 60 Aba Road, Close to MTN Office at Aba Road, Umuahia",
        },
      },
      Abuja: {
        "Area 1": {
          GIG: "SH 034, Area 1 shopping Plaza, Area 1 Abuja",
        },
        Garki: {
          GIG: "SICCONS PLAZA, Opposite Unity House, Beside Lifemate Furniture, Garki Area 11",
        },
        Gwarimpa: {
          GIG: "House 38, 3rd Avenue Gwarimpa, Opposite Union Bank Abuja.",
        },
        "Gwarimpa 2": {
          GIG: "Suite A1 Bricks and More Plaza, 6th Avenue by 7th Avenue Junction Gwarinpa",
        },
        Gwagwalada: {
          GIG: "Secretariat road beside WAEC, opposite Aso-Oke Hotel, Gwagwalada.",
        },
        Kubwa: {
          GIG: "Opposite 2/2 court junction, block 43, Gado Nasko way, along El-rufai Bustop, Kubwa.a",
          GUO: "GLora Mall Plaza, Plot No 132 Gado Nasko Road Phase 2 Kubwa, Abuja",
        },
        "Kubwa 2": {
          GIG: "Opposite Ignobis hotel plot 17 Gidin dutse layout, kubwa.",
        },
        "Kubwa 3": {
          GIG: "Kukwaba General Park, Kubwa.",
        },
        Lugbe: {
            GIG: "Shepherd-King plaza beside Remaco fuel station by Police signboard, Lugbe.",
        },
        MARARABA: {
          GIG: "No 132 Giza Plaza Opp Chrisgold Plaza Beside MTN Office Mararaba.",
          GUO: "SUITE 9, BOMMA PLAZA, SHARP CORNER BY CRISS PARK JUNCTION, ABUJA-KEFFI EXP. WAY.",
        },
        Madalla: {
          GIG: "Mobil Fueling Station along Zuba Express Way, Madalla.",
        },
        Utako: {
          GIG: "Plot 113 I.V.W. Osisiogu Street, beside Utako Police Station Utako Abuja.",
          GUO: "GOUBA Plaza, 15 A. E. Ekukinam Street, Utako District, Abuja.",
        },
        "Utako 2": {
            GIG: "Abraham Plaza, Suite A13 Plot, 6 A.E. Ekukinam St, Utako Abuja.",
        },
        "Wuse 2": {
          GIG: "80 Aminu Kano crescents opposite Sherif plaza beside Wema Bank Banex wuse 2",
        },
        "Ademola Adetokunbo": {
          GIG: "12 Nurnberger Platz, by Lobito junction, Ademola Adetokunbo Crescent, before Transcorp Hilton, Wuse 2",
        },
        Zuba: {
          GIG: "206, Zuba Market, Opp. Lagos Line, Zuba",
        },
      },
    Adamawa: {
      Yola: {
        GIG: "Plot 2 Bekaji Plaza, Bekaji Karewa Road, By Fire Service Roundabout, Jimeta Yola.",
      },
    },
    "Akwa Ibom": {
      Eket: {
        GIG: "92, Marina Road, Opposite Royalty Hotel, Eket.",
      },
      Uyo: {
        GIG: "3, Monsignor Akpan Avenue, Itam industrial layout, opp Timber Market, Itam",
      },
      "Uyo 2": {
        GIG: "No 108 Oron Road, beside First bank,Uyo",
      },
    },
    Anambra: {
      AWKA: {
        GIG: "Elite Shopping Complex Opp Crunchies fries, Enugu/Onitsha Expressway, Awka",
        GUO: "Temp Site Unizik Junction, beside Mobile Filling Station, Awka",
      },
      EKWULOBIA: {
        GUO: "7, Awka Road, Ekwulobia",
      },
      IHIALA: {
        GUO: "42, Osha Owerri Road by Patigian Hotels Ltd, Ihiala",
      },
      NNEWI: {
        GIG: "73 Owerri Road, Martina Chukwuma Plaza (Innoson Plaza), Opposite The Salvation Army Church, Umudim Nnewi",
        GUO: "2, Ibeto Road, Opp.First Bank, Nnewi",
      },
      ONITSHA: {
        GIG: "2 Awka Road, By DMGS Junction, Beside All Saints Anglican Cathedral, Onitsha",
        GUO: "166, Port Harcourt Rd, Upper Iweka, Onitsha",
      },
      UMUNZE: {
        GUO: "Round About, Umunze",
      },
    },
    Bauchi: {
      Bauchi: {
        GIG: "Shop 7, Mai Jama'a Plaza, Opposite GWARAM and Sons Plaza, Yandoka Road, Bauchi.",
      },
    },
    Bayelsa: {
        Yenagoa: {
            GIG: "Kpansia Epia, Opposite Wema Bank by INEC Junction, Yenogoa",
            },
            "Yenagoa 2": {
            GIG: "Beside Phone Headquarters, Tamic Road Junction, Okutukutu, by Express, Yenegoa.",
            },
    },
    Benue: {
        Makurdi: {
            GIG: "No 4 Old Otukpo Rd, Opposite Dester’s by Savannah Roundabout.",
            },
    },
    Borno: {
        Maiduguri: {
            GIG: "10A, Golden plaza, opposite Elkanemi College of Islamic Theology, Jos Road, Maiduguri",
            },
    },
    CrossRiver: {
        Calabar: {
            GIG: "29, Ndidem Usang Iso Road ( Aka Marian Road) Calabar.",
            },
            "Calabar 2": {
            GIG: "74, Eta Agbor road, Beside UNICAL, opposite MTN office, Calabar.",
            },
            OGOJA: {
            GUO: "Mh 113 Hospital Road, opp. Blessed Resources international oil, Beside EcoBank plc, Igoli, Ogoja",
            },
    },
    Delta: {
        Asaba: {
            GIG: "Asaba Onitsha Express way, By Head Bridge.",
            GUO: "Asaba - Onitsha Expressway by Head-Bridge, Asaba, Delta State",
            },
            "Asaba 2": {
            GIG: "445, Nnebisi Road, opposite Zenith Bank, Asaba.",
            },
            "Asaba 3": {
            GIG: "Suit 53/54 Independence Mall Okpanam Rd, Asaba.",
            },
            "Ughelli Center": {
            GIG: "6B, Uduere/Agbara Road, Off Ughelli-Warri Express Way, Ughelli.",
            },
            "Warri 2": {
            GIG: "116, Effurun-Sapele Warri Road, Effurun Opp. Our Ladies High School.",
            },
            "Warri-Effurun Center": {
            GIG: "Shop 5, Eku Plaza, 128 Effurun-Sapele road, Opp Solidas. Adjacent PZ Cussons by 7up Bus stop.",
            },
    },
    Ebonyi: {
        Abakaliki: {
            GIG: "Central Park, opposite International Market, Abakaliki",
            GUO: "GUO Office complex, at New Park, Opposite International Market, Behind Peace Park",
            },
            AFIKPO: {
            GUO: "27, Eke Market Road, Opp. Zenith Bank, Afikpo, Ebonyi State",
            },
    },

    Edo: {
        Akpakpava: {
            GIG: "112, Akpakpava Road, Benin City.",
            },
            "Airport Road": {
            GIG: "Shop 1, Omegatron Plaza, 47 Airport Road, Benin City.",
            },
            Auchi: {
            GIG: "Okene Express Way, Opp Auchi Polytechnic, Auchi.",
            },
            Benin: {
            GUO: "211 Ugbowo-Lagos Rd, by Technical Junction, Benin City, Edo state.",
            },
            "Sapele Road": {
            GIG: "131 Benin Sapele Road, Beside Genesis Restaurant, opposite Uwa Junction, Benin City.",
            },
            Ekpoma: {
            GIG: "Along Benin -Auchi expressway, Beside Big Joe park, Ekpoma.",
            },
            Uselu: {
            GIG: "202, Uselu Lagos Road, Ugbowo Benin City.",
            },
            "Ramat Park": {
            GIG: "42, Benin-Agbor road, EcoBus Park, Ramat Benin City.",
            },
    },
    Ekiti: {
        "Ado-Ekiti": {
            GIG: "Soladola petrol station, beside Apc secretariat, opposite moferere junction, along ikere road, Ajilosun",
            },
    },
    Enugu: {
        Enugu: {
            GIG: "No 1, P & T Quarters, Market Road, Opp Osisatech Polytechnic, Enugu.",
            GUO: "34 Okpara Avenue (in between UBA & Polaris Bank), Enugu",
            },
            "Enugu 2": {
            GIG: "67, Zik Avenue Uwani Enugu.",
            },
            Nsukka: {
            GIG: "No 64 Owerrani, Enugu Road, Nsukka.d",
            },
    },
    Gombe: {
        Gombe: {
            GIG: "Shop 4, el-zaks plaza opposite Conoil filling station along FTH/police Headquarters ashaka road, Gombe.",
            },
    },
    Imo: {
        Owerri: {
            GIG: "Plot C31, Relief Road, by Relief Junction, Off Egbu Road, Owerri.",
            GUO: "15, Egbu Road, Owerri",
            },
            "Owerri 2": {
            GIG: "Odonko Plaza, No 7 Nwaturuocha street, Ikenegbu Owerri.",
            },
            "Owerri 3": {

            GIG: "Shop 9 Lion Yard Plaza, plot 26A/26B Federal Housing Estate along Umuguma Road (World Bank), New Owerri.",
            },
            ORLU: {
            GUO: "No 7 ASIKA ILOBI Avenue, Orlu, Imo",
            },

    },
    Jigawa: {
        Dutse: {
            GIG: "Government House Round-About, Asamau House Block B, Number 8, by Airtel Office, Dutse, Jigawa State.",
            },
    },
    Kaduna: {
        KADUNA: {
            GIG: "Jos Road Plaza. 19/20, Jos Road, by Ahmadu Bello Way, Kaduna.",
            },
            "KADUNA 2": {
            GIG: "Shop A04, No 6 Gidanbu Plaza, Kaduna to Lagos Road, Opposite Kaduna Old Airport Road, Kaduna.",
            },
            "KADUNA 3": {
            GIG: "Nnamdi Azikiwe Expressway by Command Junction, close to Samrada Fuel Station (beside 911 bakery).",
            },
            Zaria: {
            GIG: "Shop 2, D2 Plaza No. 18 Sokoto road beside Shagalinku London Hotel after MTD Junction, Sabon Gari Zaria.",
            },
    },
    Kano: {
        KANO: {
            GIG: "1, Bompai Road by Tafawa Balewa Way, Opp Domino's Pizza, Kano.",
            },
            "KANO 2": {
            GIG: "Shop 2&3 Centro Plaza, Opp BUK Old Site, Kabuga, Kano.",
            },
            "KANO 3": {
            GIG: "Khadijah house, Zaria Road opposite Kano State House of Assembly",
            },
    },
    Katsina: {
        Katsina: {
            GIG: "Abudullahi Sarki Muktar Road, Along Kiddies Round-About, Near Tukur Jikamshi Residence Katsina.",
            },
    },
    Kebbi: {
        "Birnin Kebbi": {

            GIG: "Ahmadu Bello Way opp alhaji boye coca cola Depot birnin kebbi, kebbi state",
            },
    },
    Kogi: {
        Lokoja: {
            GIG: "No 1 IBB Way, Adankolo, Lokoja, close to Federal Medical Center.",
            },
    },
    Kwara: {
        Ilorin: {
            GIG: "151, Ibrahim Taiwo Road (Upper Taiwo), Adjacent Chicken Republic, Ilorin",
            },
            "Ilorin 2": {
            GIG: "34B, University of Ilorin Road, Beside Reo Cakes Plaza, Tanke, Ilorin.",
            },
    },
    Lagos: {
        "Abule-Egba": {
          GIG: "568, Abeokuta Expressway, Ajala Bus/Stop Abule-Egba.",
        },
        Agbara: {
          GIG: "Agbeke Filling Station, Morogbo, Along Badagry Expressway Agbara, Lagos.",
        },
        AGEGE: {
          GUO: "3, Agunbiade Oke-koto Street, Agege, Lagos.",
        },
        "Alaba International": {
          GIG: "Cs1 Ground Floor Corner Stone Plaza By Dobbil Avenue Along Phone Village Road, Electronics Section Alaba International Market.",
          GUO: "Alaba International Mkt, 29, Ojo Ebegbede Road, Opp. Chemist Bus-Stop, Alaba, Lagos",
        },
        "Ajah 1": {
          GIG: "KM 25, Lekki-Epe Express way, Ajiwe-Ajah.",
        },
        "Ajah 2": {
          GIG: "KM 22, Lekki-Epe Express way, Opp. Jeffrey’s Plaza, by Abraham Adesanya Roundabout, Ajah.",
          GUO: "KM 22, Epe - Expressway, Abraham Adesanya Est. Junction, Ajah, Lagos",
        },
        "Addo Badore": {
          GIG: "Tripple Ace Dew Building, opposite Enyo filling Station Addo road.",
        },
        Akowonjo: {
          GIG: "41 Shasha Road, Akowonjo Junction, Dopemu, Lagos.",
        },
        Awoyaya: {
          GIG: "Titi's Place, beside Royal Park Hotel, by Ogunfayo Bus stop. Km 36, Lekki Epe expressway, Eputu, Awoyaya, Lagos.",
        },
        "Amuwo-Odofin": {
          GIG: "Shop A105 Cosjane Mall Opposite Diamond Estate, By Festac Link Bridge, Amuwo Odofin, Lagos.",
        },
        "Broad Street": {
          GIG: "158 Broad street, Lagos Island. (Behind UBA head office Marina), Lagos.",
        },
        "Cele Okota": {
          GIG: "103, Okota Road, Cele.",
        },
        COKER: {
          GUO: "36 Alhaji Orire Street, Wema Bank Bus Stop, Coker, Lagos",
        },
        Epe: {
          GIG: "Animashaun Plaza, Beside Petrocam fuel station, Near Epe T-junction, Epe.",
        },
        EJIGBO: {
          GUO: "67A, Ikotun-Egbe Road, Opp Power Line B/Stop, Ejigbo.",
        },
        Festac: {
          GIG: "1st Avenue Road,Festac first gate, beside Inec office, Festac town, Lagos.",
        },
        Gbagada: {
          GIG: "7, Hospital Rd, Ifako, Gbagada, Lagos.",
        },
        "Gbagada Express Center": {
          GIG: "GIG Logistics Digital Hub. No 1 Sunday Ogunyade Street, Gbagada Expressway,Beside Eterna Fuel Station, Gbagada Lagos.",
        },
        Iba: {
          GUO: "1, Ipaye Street, Iba, Lagos",
        },
        "Ikeja 2": {
          GIG: "80, Awolowo Way, Ikeja, Lagos.",
        },
        "Ikeja 1": {
          GIG: "9, Medical Road, former Simbiat Abiola Way, Opp, Zenith Bank.",
        },
        Isolo: {
          GIG: "43, Osolo Way, Ajao Estate, Ekwu Awolo House.",
        },
        Ikoyi: {
          GIG: "103 Awolowo road, Ikoyi Lagos.",
        },
        Ikosi: {
          GIG: "16 Ikosi Road, Ketu Lagos.",
        },
        Ikorodu: {
          GIG: "Sabo Road Garage, Ikorodu.",
        },
        Fadeyi: {
          GIG: "69, Ikorodu Road, Fadeyi, Lagos",
        },
        Ikotun: {
          GIG: "29,Idimu Road, Opp. Local Govt, Council, Ikotun, Lagos.",
          GUO: "10 Ijegun road, Ikotun",
        },
        Ilupeju: {
          GIG: "Flat 1, Block 1, LSDPC Estate Beside UBA, 12, Industrial Avenue, Cappa Bus-stop, Ilupeju, Lagos.",
        },
        "International trade fair": {
          GIG: "Shop D77 & D78, Abia Plaza, BBA, Lagos Int’ Trade Fair Complex, Lagos.",
        },
        "Igbo Efon": {
          GIG: "Km 17 Scapular plaza Igbo efon.",
        },
        "Iyana Ipaja": {
          GIG: "164, Lagos Abeokuta Express Way, beside Access Bank, Iyana Ipaja, Lagos.",
          GUO: "KM 168 Abeokuta Expressway/No 1 Tijani Street beside Access bank, Iyana Ipaja Bus Stop, Iyana Ipaja, Lagos State.",
        },
        Jibowu: {
          GIG: "GIGM Terminal: 20 Ikorodu Express Road, Jibowu, Lagos.",
          GUO: "2 Jibowu Street along Ikorodu Expressway, Jibowu, Lagos.",
        },
        "Lekki Admiralty": {
          GIG: "No 1A, Wole Ariyo Street, Beside First Bank, Lekki Phase 1.",
        },
        "Lekki Admiralty 2": {
          GIG: "Jubilee Mall Admiralty Way, Lekki Phase One, Lekki.",
        },
        "Lekki Admiralty 3": {
          GIG: "Lekki Center, No 2, Admiralty Road, Lekki Phase 1.",
        },
        "Lekki (Fola Osibo)": {
          GIG: "Ground floor Legends Place Mall Plot 29 Fola Osibo Lekki Phase 1, Lagos.",
        },
        "MAZA MAZA": {
          GUO: "1st Gate B/Stop Badagry Express Way Maza Maza Lagos",
        },
        Oniru: {
          GIG: "Banex Mall Suite V.GL 01, Akiogun Road, Oniru, Lagos.",
        },
        "Old Ojo Road": {
          GIG: "Old Ojo Road, After Agboju Bus stop, opposite Access Bank, by the police Station.",
        },
        Ogba: {
          GIG: "3 Ijaiye Road, Beside FCMB Ogba.",
        },
        Ogudu: {
          GIG: "141, Ogudu road Beside UBA, Studio24 building, Ogudu.",
        },
        "Ojodu Berger": {
          GIG: "47A Ogunnusi Road, opp Divas cake, beside Access Bank, Ojodu Berger b/stop, Lagos.",
        },
        OKOTA: {
          GUO: "164, Okota Road, Lagos",
        },
        Opebi: {
          GIG: "62B, Opebi Road by Salvation junction Opp So-fresh, Opebi, Ikeja, Lagos",
        },
        "Orchid Road": {
          GIG: "Orchid road (E-MALL Plaza) by VAN DANIEL's Estate Orchid Lagos.",
        },
        "Osapa (Canal Mall)": {
          GIG: "2 Ganiu Eletu Way, Osapa London, Lekki-Epe Expressway, Lagos.",
        },
        OTTO: {
          GUO: "7 Railway compound Otto Bus stop, Opp. Police barracks, Otto, Lagos",
        },
        Oyingbo: {
          GIG: "No 25 Otto Causeway Opp Iddo Bus stop, Iddo Ebute Metta Lagos.",
        },
        Sango: {
          GIG: "3, Abeokuta – Lagos Expressway, Sango Ota, Opp. Sango Bridge.",
        },
        Surulere: {
          GIG: "26, Adeniran Ogunsanya, Surulere, Lagos.",
        },
        Volks: {
          GIG: "169, Badagry Expressway, Volkswagen Bus Stop.",
        },
        "Victoria Island": {
          GIG: "1436 Sanusi Fafunwa Street, Victoria Island, Lagos.",
        },
        "Victoria Island 2": {
          GIG: "272b Akin Adeshola Street, Beside Honda Place, Victoria Island, Lagos.",
        },
        Yaba: {
          GIG: "Shop G-021, Ground Floor, Tejuosho Ultra Modern Shopping complex, Ojuelegba road, Yaba.",
        },
      },
    Nasarawa: {
        Lafia: {
            GIG: "Shops 1 & 2 Police Officers Mess, Opposite Polaris Bank, Jos Road, Lafia.",
            },
    },
    Niger: {
        Minna: {
            GIG: "Landmark: After Mr Biggs beside Nepa Office, Farm Center Area, Tunga, Minna – Niger State.",
            },
    },
    Ogun: {
        Abeokuta: {
            GIG: "62, Tinubu Street, Ita Eko, Abeokuta, Ogun State",
            },
            "Abeokuta FUNAAB": {
            GIG: "Block A, Shop 9, SSANU complex, besides Paradise, FUNAAB, Abeokuta",
            },
            "Ijebu Ode": {
            GIG: "3, Abeokuta-Lagos Expressway, beside 9mobile office Opp. Sango Bridge, Sango Ota.",
            },
            "Sango Ota": {
            GIG: "102, Ibadan road opposite NEPA office Ibadan garage ijebu ode.",
            },
    },
    Ondo: {
        Akure: {
            GIG: "22, Oyemekun Road, Opposite SLOT, Akure, Ondo State.",
            },
            Ondo: {
            GIG: "30, Yaba Street, Opposite Crunchies, Ondo Town, Ondo State.",
            },
    },
    Osun: {
        "Ile-Ife": {
            GIG: "EXODUS Filling Station, opposite Airtel Office, Mayfair, Ile-lfe, Osun State",
            },
            Osogbo: {
            GIG: "KM3, Gbongan/Ibadan Road, NIPCO Petrol Station, Ogo Oluwa, Osogbo.",
            },
    },
    Oyo: {
        Ibadan: {
            GIG: "Town Planning Complex, by Sumal Foods, Ring Road, Ibadan",
            },
            "Ibadan 2": {
            GIG: "Suite 5, Kamal memorial plaze, former iyalode complex, opposite funcktionals clothing, bodija - UI road, UI Ibadan.",
            },
            "Ibadan 3": {
            GIG: "Bovas Filling Station, 106/107 Agbaakin Layout adjacent olowo tin fowo shanu shopping complex, Iwo Road, Ibadan.",
            },
            Ogbomoso: {
            GIG: "Eterna Fuel Station (Akala Complex), Opp Zenith Bank Starlight Ogbomoso",
            },
    },
    Plateau: {
        Jos: {
            GIG: "Plaza 1080, Yakubu Gowon way, Dadin kowa second gate.",
            },
            "Jos 2": {
            GIG: "Opposite Jankwano Bingham University Teaching Hospital, Jos.",
            },
    },
    Rivers: {
        "PORT HARCOURT Alakahia": {
            GIG: "Linus Book Shop Building beside Today FM Road, East-West Road PHC.",
            },
            "PORT HARCOURT Elelenwo": {
            GIG: "No 299 Old Refinery Road, by De-Young Junction, Elelenwo, Port Harcourt.",
            },
            "PORT HARCOURT Eliozu": {
            GIG: "emmanuel plaza, G.u Ake Road, beside planet filling station, eliogbolo, Eliozu, Port Harcourt.",
            },
            "PORT HARCOURT Woji": {
            GIG: "Agora Plaza. 118 Woji Road, By Bodo Junction, GRA Phase 2, Port Harcourt. (Same Building with Miskay Boutique).",
            },
            "PORT HARCOURT Stadium": {
            GIG: "9 Stadium Road, Beside Benjack, Port Harcourt",
            },
            "PORT HARCOURT Artillery": {
            GIG: "Cocaine Village Junction, Off Aba Rd, opposite Genesis, Rumuogba, Port Harcourt.",
            },
            "PORT HARCOURT Peter Odili": {
            GIG: "89, Peter Odili Road, Besides Eterna Fueling Station, Port Harcourt",
            },
            "PORT HARCOURT Ada George": {
            GIG: "No 18 Ada George By Okilton Junction, Port Harcourt.",
            },
            "PORT HARCOURT Tombia": {
            GIG: "67, Tombia Ext GRA, Port Harcourt.",
            },
            "PORT HARCOURT Olu Obasanjo": {
            GIG: "61, Olu Obasanjo Road, opposite olu obasanjo roundabout, Port Harcourt.",
            },
            "PORT HARCOURT Air Force Base": {
            GUO: "Along Aba road (at intersection with Lord Emmanuel Drive, b/w Thermocool & Happy Bite), Opp Air Force Base, Port Harcourt",
            },
    },
    Sokoto: {
        Sokoto: {
            GIG: "3/4 Maiduguri Road Gawon Nama Area",
            },
    },
    Taraba: {
        Jalingo: {
            GIG: "106 White Castle Plaza Barde Way Beside A.U.K Kirbir Shopping Plaza, Jalingo.",
            GUO: "Opp. Coca Cola Depot, Along Mile 6, Yola Road.",
            },
    },
    Yobe: {
        Damaturu: {
            GIG: "Shop 2, Adhaza Plaza, Gashuwa Road, Damaturu.",
            },
    },
    };
    

  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const proceedToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleDownloadInvoice = async () => {
    setLoading(true);
  
    const cartItems = cart.items.map((item) => ({
      name: item.name,
      size: item.size,
      unit_price: item.price,
      total: item.price * item.quantity,
    }));
  
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // Example tax rate: 10%
    const total = subtotal + tax;
  
    const orderPayload = {
      id: formData.orderId,
      name: formData.name,
      email: formData.email,
      number: `+234${formData.contact}`,
      "Delivery Company": formData.deliveryCompany,
      State: formData.state,
      Location: formData.busStop,
      "Pickup Address": formData.pickupLocation,
      items: cartItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };

  
    try {
      const response = await BackendSwitchingClient({
        endpoint: "/api/orders/invoice",
        method: "POST",
        data: orderPayload,
        headers: { "Content-Type": "application/json" },
        timeout: 15000, // Adjust timeout if necessary
      });
  
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
        : `Invoice_${formData.orderId}.pdf`;
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      setDownload(true);
      dispatch({ type: "CLEAR_CART" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to download the invoice. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    setLoading(true);
    const cartItems = cart.items.map((item) => ({
      name: item.name,
      size: item.size,
      fit: item.fit,
      unit_price: item.price,
      total: item.price * item.quantity,
      quantity: item.quantity,
    }));
  
    try {
      const res = await BackendSwitchingClient({
        endpoint: "/api/orders/metadata",
        method: "POST",
        data: {
          name: formData.name,
          email: formData.email,
          number: `+234${formData.contact}`,
          items: cartItems,
        },
        headers: { "Content-Type": "application/json" },
        timeout: 15000, // Adjust timeout if necessary
      });
  
      const { order_id } = res.data;
  
      setFormData((prevData) => ({
        ...prevData,
        orderId: order_id,
      }));
  
      setMessage({
        type: "success",
        text: `Your order has been confirmed! Order ID: ${order_id}`,
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Something went wrong",
      });
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  if (!download && cart.items.length === 0) {
    // Render an empty cart page
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-darkSecondary text-center p-6">
        <h1 className="text-2xl font-bold text-primary dark:text-darkPrimary mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-secondary dark:text-darkAccent mb-6">
          Looks like you haven’t added anything to your cart yet. Explore our
          amazing products and find something you love!
        </p>
        <button
          onClick={() => router.push("/products")}
          className="bg-primary text-white py-3 px-6 rounded-lg shadow-md hover:bg-secondary dark:bg-darkAccent transition-all"
        >
          Shop Now
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background dark:bg-darkBackground py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary dark:text-white mb-6">
          Checkout
        </h1>
        {message && (
        <MessageModal
          messageType={message.type}
          messageText={message.text}
          onClose={() => setMessage(null)}
        />
      )}

        {/* Step Progress */}
        <StepProgress currentStep={currentStep} />

        {/* Step Forms */}
        <div className="mt-6">
          {currentStep === 1 && (
            <ContactForm
              formData={formData}
              onFormChange={handleFormChange}
              onNext={proceedToNextStep}
            />
          )}
          {currentStep === 2 && (
            <DeliveryDetails
              formData={formData}
              onFormChange={handleFormChange}
              mappedData={mappedData}
              onNext={proceedToNextStep}
            />
          )}

          {!download && currentStep === 3 && (
            <OrderSummary
              orderDetails={{ ...formData, cartItems: cart.items }}
              onConfirm={handleConfirmOrder}
              onDownloadInvoice={handleDownloadInvoice}
              loading={loading}
              onError={error}
              OnRetry={handleConfirmOrder}
            />
          )}

          {download && currentStep === 3 && (
            <InvoiceDownloaded />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
