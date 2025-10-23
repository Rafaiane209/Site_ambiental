const formArvore = document.getElementById("formArvore");

formArvore.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const imagem = document.getElementById("imagem").value;
    const qrcode = document.getElementById("qrcode").value;

    await firebase.firestore().collection("arvores").add({
        nome, descricao, imagem, qrcode
    });

    alert("Árvore cadastrada com sucesso!");
    formArvore.reset();
});
