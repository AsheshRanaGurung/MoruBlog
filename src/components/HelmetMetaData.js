import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
export default function HelmetMetaData(props) {
  let location = useLocation();
  let currentUrl = "http://moru-blog.herokuapp.com/" + location.pathname;
  let quote = props.quote !== undefined ? props.quote : "";
  let title =
    props.title !== undefined ? props.title : "Moru BLog -Power To The People";
  let hashtag = props.title !== undefined ? props.title : "#Moruwallet";
  let image =
    props.image !== undefined
      ? props.image
      : "https://moru.com.np/wp-content/uploads/2022/01/Featured-image.jpg";
  let description =
    props.description !== undefined
      ? props.description
      : "Our mission is to be the leading payment service provider, delivering world class service through the blending of state-of-the-art technology and visionary management in partnership with competent and committed staff, to achieve reliable system of services to all with sustainable value addition to all our stakeholders.";
  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} />{" "}
    </Helmet>
  );
}
