import React from "react";
import Image from "next/image";

const index = ({ ImageData }) => {
  return (
    <div>
      {ImageData.map((value) => {
        return (
          <Image
            key={value.ImageID}
            src={value.Image}
            alt="image"
            width={100}
            height={100}
          />
        );
      })}
    </div>
  );
};

export default index;

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3001/images");
    const { Images } = await res.json();

    return {
      paths: Images.map((image) => {
        return { params: { id: image.ImageID.toString() } };
      }),
      fallback: false,
    };
  } catch (err) {
    console.log("Ops path in invaid!");
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`http://localhost:3001/image/${params.id}`);
    const Image = await res.json();

    return {
      props: {
        ImageData: Image,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
