import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  Font,
  View,
} from "@react-pdf/renderer";
import Poppins from "../../fonts/Poppins-Regular.ttf";
import PoppinsSB from "../../fonts/Poppins-SemiBold.ttf";
import PoppinsB from "../../fonts/Poppins-Bold.ttf";
import PoppinsEB from "../../fonts/Poppins-ExtraBold.ttf";
import Arabic from "../../fonts/Arabic.ttf";
import React from "react";
import Html from "react-pdf-html";

Font.register({
  family: "Poppins",
  src: Poppins,
});

Font.register({
  family: "PoppinsSB",
  src: PoppinsSB,
});

Font.register({
  family: "PoppinsB",
  src: PoppinsB,
});

Font.register({
  family: "PoppinsEB",
  src: PoppinsEB,
});

Font.register({
  family: "Arabic",
  src: Arabic,
});

const styles = (color, secondarycolor, width) =>
  StyleSheet.create({
    body: {
      padding: 15,
      color: secondarycolor,
    },
    companyIfo: {
      height: 80,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: secondarycolor,
    },
    title: {
      fontSize: 22,
      fontFamily: "PoppinsEB",
      letterSpacing: 2,
      fontWeight: 500,
      color: color,
      textAlign: "center",
    },
    logo: {
      objectFit: "contain",
    },

    row1: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 12,
      paddingVertical: 30,
      color: secondarycolor,
    },

    r1r2h: {
      display: "flex",
      flexDirection: "row",
      fontSize: 10,
      paddingVertical: 2.5,
      color: secondarycolor,
      fontFamily: "PoppinsSB",
    },

    r1r2: {
      display: "flex",
      flexDirection: "row",
      fontSize: 10,
      paddingVertical: 2.5,
      color: secondarycolor,
    },

    r1r2l: {
      width: "40%",
      color: secondarycolor,
      fontFamily: "PoppinsSB",
    },
    r1Div: {
      fontSize: 10,
      width: "50%",
      color: secondarycolor,
    },

    invoice: {
      fontSize: 14,
      textAlign: "center",
      paddingTop: 10,
      color: color,
      fontFamily: "PoppinsB",
      letterSpacing: 1,
    },
    order: {
      fontSize: 15,
      textAlign: "center",
      padding: 10,
      color: color,
      paddingBottom: 20,
      fontFamily: "PoppinsB",
      letterSpacing: 1,
    },
    th: {
      display: "flex",
      flexDirection: "row",
      fontSize: 10,
      borderWidth: 1,
      borderStyle: "solid",
      borderBottom: 1,
      borderLeft: 0,
      borderRight: 0,
      borderTop: 1,
      borderColor: secondarycolor,
      color: color,
      width: "100%",
      fontFamily: "PoppinsB",
      paddingVertical: 10,
      paddingLeft: 6,
    },
    td: {
      display: "flex",
      flexDirection: "row",
      fontSize: 10,
      color: secondarycolor,
      width: "100%",
      paddingVertical: 10,
      color: secondarycolor,
      paddingLeft: 25,
    },
    thd: {
      width: width,
      color: secondarycolor,
    },

    tb: {
      fontSize: 10,
      borderWidth: 1,
      borderStyle: "solid",
      borderBottom: 1,
      borderLeft: 0,
      borderRight: 0,
      borderTop: 1,
      borderColor: secondarycolor,
      color: secondarycolor,
      width: "100%",
      fontFamily: "Poppins",
    },
    tbd: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      paddingVertical: 5,
      paddingLeft: 6,
    },
    tbdr: {
      width: "15%",
    },

    termsTitle: {
      fontFamily: "PoppinsB",
      fontSize: 11.5,
      color: color,
    },
    terms: {
      fontSize: 11,
      lineHeight: 1.5,
      paddingVertical: 25,
    },
    html: {
      fontFamily: "Arabic",
      fontSize: 10,
    },
  });

const PDFfile = ({ data, model, color, secondarycolor }) => {
  return (
    <Document>
      <Page style={styles(color, secondarycolor).body}>
        <View style={styles(color, secondarycolor).companyIfo}>
          <Image
            src={`data:image;base64, ${data.company_info.companyLogo}`}
            alt={data.company_info.companyLogoName}
            style={styles(color, secondarycolor).logo}
          />
          <Text style={styles(color, secondarycolor).title}>
            {data?.company_info?.companyName}
          </Text>
        </View>

        <Text style={styles(color, secondarycolor).invoice}>Invoice</Text>
        <View style={styles(color, secondarycolor).row1}>
          <View style={styles(color, secondarycolor).r1Div}>
            <View style={styles(color, secondarycolor).r1r2}>
              <Text style={styles(color, secondarycolor).r1r2l}>
                Invoice Date
              </Text>
              <Text>: {data.invoice?.date}</Text>
            </View>
            <View style={styles(color, secondarycolor).r1r2}>
              <Text style={styles(color, secondarycolor).r1r2l}>
                Invoice Number
              </Text>
              <Text>: {data.invoice?.invoice_number}</Text>
            </View>
            <View style={styles(color, secondarycolor).r1r2}>
              <Text style={styles(color, secondarycolor).r1r2l}>Billed To</Text>
              <Text>: {data.invoice?.customer_name}</Text>
            </View>
            <View style={styles(color, secondarycolor).r1r2}>
              <Text style={styles(color, secondarycolor).r1r2l}>
                Mode Of Payment
              </Text>
              <Text>: Cash</Text>
            </View>
          </View>
          <View style={styles(color, secondarycolor).r1Div}>
            <Text style={styles(color, secondarycolor).r1r2h}>
              Store Details
            </Text>
            <Text style={styles(color, secondarycolor).r1r2}>
              No.14, American Street, 46th Main Road
            </Text>
            <Text style={styles(color, secondarycolor).r1r2}>
              California 161-716
            </Text>
            <Text style={styles(color, secondarycolor).r1r2}>US</Text>
            <Text style={styles(color, secondarycolor).r1r2}>
              Phone No. 86518165968
            </Text>
          </View>
        </View>
        <Text style={styles(color, secondarycolor).order}>Order Summary</Text>
        <View style={styles(color, secondarycolor).th}>
          <Text style={styles(secondarycolor, color, "15%").thd}>
            Serial No.
          </Text>
          <Text style={styles(secondarycolor, color, "35%").thd}>
            Description
          </Text>
          <Text style={styles(secondarycolor, color, "15%").thd}>Price</Text>
          <Text style={styles(secondarycolor, color, "20%").thd}>Quantity</Text>
          <Text style={styles(secondarycolor, color, "15%").thd}>
            Item Total
          </Text>
        </View>

        {data.invoice?.line_items?.map((product, index) => (
          <View style={styles(color).td} key={index}>
            <Text style={styles(color, secondarycolor, "15%").thd}>
              {index + 1}
            </Text>
            <Text style={styles(color, secondarycolor, "35%").thd}>
              {product.description}
            </Text>
            <Text style={styles(color, secondarycolor, "17.5%").thd}>
              {product.rate}
            </Text>
            <Text style={styles(color, secondarycolor, "17.5%").thd}>
              {product.quantity}
            </Text>
            <Text style={styles(color, secondarycolor, "15%").thd}>
              {product.item_total}
            </Text>
          </View>
        ))}

        <View style={styles(color, secondarycolor, "16.5%").tb}>
          <View style={styles(color, secondarycolor, "16.5%").tbd}>
            <Text>Sub Total</Text>
            <Text style={styles(color, secondarycolor, "16.5%").tbdr}>
              {data.invoice?.sub_total}
            </Text>
          </View>
          <View style={styles(color, secondarycolor, "16.5%").tbd}>
            <Text>Discount ({data.invoice?.discount})</Text>
            <Text style={styles(color, secondarycolor, "16.5%").tbdr}>
              {data.invoice?.discount_amount}
            </Text>
          </View>
          <View style={styles(color, secondarycolor, "16.5%").tbd}>
            <Text>Total ({data.invoice?.currency_code})</Text>
            <Text style={styles(color, secondarycolor, "16.5%").tbdr}>
              {data.invoice?.total + data.invoice?.currency_symbol}
            </Text>
          </View>
        </View>
        <View style={styles(color, secondarycolor).terms}>
          <Text style={styles(color, secondarycolor).termsTitle}>
            Terms & Conditions
          </Text>
          <View style={styles(color, secondarycolor).html}>
            <Html style={{ fontSize: 10, fontFamily: "Arabic" }}>
              {data.company_info.terms}
            </Html>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFfile;
