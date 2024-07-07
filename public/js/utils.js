export async function shareData() {
    const post = window.location.href.split("/").reverse()[0]
    const dataToShare = {
      title: document.title,
      text: `Zapraszam do ${document.title}`,
      url:
        `https://zoltyzeszyt.pl/posts/${post}/`
    };

    try {
      await navigator.share(dataToShare);
    } catch (err) {
      console.log(err);
    }
  }