
  const onSubmit = () => {
  
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);

    axios.post('/post', formData); 
  };

  const onChangeImages = (e) => {
    console.log('images', e.target.files);
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.image.files[0]);
    formData.append('image', e.target.image.files[1]);
    formData.append('image', e.target.image.files[2]);

    e.target.files.map((v, index) => {
      formData.append('image', v)
    })

    axios.post('/images', formData).catch()
    // 응답으로 저장된 파일명을 준다.
    
  }

<form encType="multipart/form-data" onSubmit={onSubmit}>
  <input value={text} placeholder="게시글부분" />
  <input type="file" name="image" multiple onChange={onChangeImages} />
  <button type="submit">전송</button>
</form>


