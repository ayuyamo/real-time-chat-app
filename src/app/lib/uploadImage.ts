// // lib/uploadImage.ts

export const uploadImage = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=e82b8a6fd08d3c1721b4ddb9052aea8d`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            console.log("Image uploaded to ImgBB:", data.data.url);
            return data.data.url;
        } else {
            console.error("ImgBB upload failed:", data);
            return "";
        }
    } catch (error) {
        console.error("ImgBB upload error:", error);
        return "";
    }
};
