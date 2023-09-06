
<script>
    import wallpaperStore from "../../store/localstorage";
    import oldWallpapersStore from "../../store/oldWallpapers";
  
    let selectedFile = null;
    let wallpaperList = [];
    let currentWallpaper = '';
    let previewURL = null;

    function setWallpaper() {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Save the uploaded image as the current wallpaper
        wallpaperStore.set(event.target.result);

        // Extract and save the file name
        const fileName = selectedFile.name;
        oldWallpapersStore.update((oldWallpapers) => [{ url: event.target.result, name: fileName }, ...oldWallpapers]);

        // Reset the selected file and preview
        selectedFile = null;
        previewURL = null;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please select an image to set as wallpaper.');
    }
  }
  
    function handleFileInputChange(event) {
        selectedFile = event.target.files[0];

        // Display a preview of the selected image
        if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
            previewURL = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
        } else {
        previewURL = null;
        }
    }

  
    // Load saved wallpapers from the store
    wallpaperStore.subscribe(($wallpaperStore) => {
      currentWallpaper = $wallpaperStore;
    });
  
    // Load saved old wallpapers from the store
    oldWallpapersStore.subscribe((oldWallpapers) => {
      wallpaperList = oldWallpapers;
    });
  
    function selectWallpaper(wallpaper) {
      wallpaperStore.set(wallpaper.url);
    }

    function clear(){
        oldWallpapersStore.set([{"url": "https://cdn.wallpapersafari.com/65/69/Fsex26.png", "name":"Default"}])
    }
  </script>
  
  <div class="wallpaper">
      <div class="previewcontainer">
          <div class="monitor">
              <div class="preview" style="background-image: url({previewURL || $wallpaperStore});"></div>
          </div>
      </div>
      <div id="input">
          <input type="file" accept="image/png, image/gif, image/jpeg" on:change={handleFileInputChange}>
          <button on:click={setWallpaper}>Set Wallpaper</button>
      </div>
      <div class="saved-wallpapers">
            <div class="title">
                <div>Saved Wallpapers</div>
                <button on:click={clear}>Clear</button>
            </div>

          <hr>
          <ul>
              {#each wallpaperList as wallpaper}
                  <li>
                    <img src={wallpaper.url} alt={wallpaper.name} on:click={() => selectWallpaper(wallpaper)}>
                    <div class="name">{wallpaper.name}</div>
                  </li>
              {/each}
          </ul>
      </div>
  </div>
  
<style>
    .title{
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .name{
        width: 60px;
        height: 24px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: no-wrap;
    }
    ul{
        padding: 0;
    }
    li{
        display: inline-block;
        margin: 5px;
        padding: 5px;
        border: 1px solid black;
        border-radius: 5px;
        width: fit-content;
        list-style: none;
    }
    img{
        height: 50px;
        width: 70px;
    }
    input{
        padding: 7px;
    }
    button{
        padding: 5px;
        margin: 5px;
        background-color: #f4f1ec;
        border: 2px solid #316290;
        border-radius: 4px;
        box-shadow: inset 10px 10px 12px -4px rgba(255,255,255,0.42);
        margin-top: 3px;
    }
    button:hover{
        box-shadow: inset 10px 10px 12px -4px rgba(194, 194, 194, 0.62);
    }
    button:active{
        box-shadow: inset 10px 10px 12px -4px rgba(0, 0, 0, 0.32);;
    }
    .wallpaper{
        padding: 50px;
    }
    .preview{
        width: 155px;
        height: 112px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        margin: auto;
        top: 15px;
        position: relative;
    }
    .previewcontainer{
        height: 159px;
        width: 100%;
    }
    .monitor{
        width: 100%;
        height: 100%;
        background-image: url(../../../assets/Monitor.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
    #input{
        display: table;
        margin: 25px auto;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
</style>