<template>
  <div class="sidebar">
    <nav id="ml-menu" class="menu">
      <div class="text-center">
        <button
          type="button"
          class="btn btn-danger btn-sm remove-all-btn"
          v-show="dropzoneHasFiles"
          @click="removeAllFiles"
        >Remove all</button>
      </div>
      <div class="menu__wrap">
        <vue-dropzone
          @vdropzone-file-added="fileAdded"
          @vdropzone-removed-file="fileRemoved"
          ref="dropzone"
          id="dropzone"
          :options="dropzoneOptions"
        ></vue-dropzone>
      </div>
    </nav>
  </div>
</template>

<script>
import PdfJS from "pdfjs-dist/webpack.js";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapActions } from "vuex";
import fileMixin from "./mixins/fileMixin";

export default {
  name: "Sidebar",
  components: {
    vueDropzone: vue2Dropzone
  },
  mixins: [fileMixin],
  data() {
    return {
      dropzoneOptions: {
        url: "127.0.0.1",
        autoProcessQueue: false,
        createImageThumbnails: false,
        parallelUploads: 1,
        previewTemplate: this.template(),
        removedfile: () => {} // ...do not remove otherwise the animation will not work
      },
      dropzoneHasFiles: false
    };
  },
  methods: {
    ...mapMutations(["ADD_FILE", "REMOVE_FILE"]),

    ...mapActions(["addFile", "removeFile"]),

    fileAdded: function(file) {
      const reader = new FileReader();

      reader.onload = () => {
        var typedarray = new Uint8Array(reader.result);
        PdfJS.getDocument(typedarray).then(pdf => {
          pdf.getPage(1).then(page => {
            var viewport = page.getViewport(1);

            var newFile = {};

            newFile.name = file.name;
            newFile.width = Math.round(viewport.width * 0.352777778);
            newFile.height = Math.round(viewport.height * 0.352777778);
            newFile.class = this.classifyFile(newFile.width, newFile.height);
            newFile.copies = 1;

            this.addFile(newFile);

            this.dropzoneHasFiles = true;
          });
        });
      };

      reader.readAsArrayBuffer(file);
    },

    fileRemoved: function(file) {
      file.previewElement.classList.add("removed-file");
      setTimeout(() => file.previewElement.remove(), 400);
      this.removeFile(file);

      this.$refs.dropzone.getQueuedFiles().length == 0
        ? (this.dropzoneHasFiles = false)
        : (this.dropzoneHasFiles = true);
    },

    removeAllFiles: function() {
      this.$refs.dropzone.removeAllFiles();
    },

    classifyFile: function(width, height) {
      var minWasteIndex = this.findMinimumPaperWaste(width, height);

      if (minWasteIndex == 0) return "60";
      else if (minWasteIndex == 1) return "90";
      else if (minWasteIndex == 2) return "60";
      else return "90";
    },

    template: function() {
      return `<div class="file-preview py-1">
                <span data-dz-name class="dz-filename badge badge-neutral text-truncate align-middle mb-0"></span>
                <a href="#" class="btn btn-link btn-danger btn-sm remove-file-btn" data-dz-remove>
                  <i class="tim-icons icon-simple-remove text-danger btn-remove-file" style="cursor:pointer"></i>
                </a>
              </div>
          `;
    }
  }
};
</script>

<style lang="scss">
.dropzone {
  background: transparent;
  height: 100%;
  border: none;
}

.dropzone:hover {
  background: transparent;
}

.dropzone.dz-clickable .dz-message,
.dropzone.dz-clickable .dz-message * {
  cursor: pointer;
  position: absolute;
  bottom: 177px;
  width: 100%;
  left: 0;
}

.dz-progress {
  display: none !important;
}

.dz-size {
  display: none !important;
}

.dz-filename {
  text-transform: none !important;
  width: 180px;
  margin-right: 10px;
  font-size: 0.8rem !important;
}

.file-preview {
  border-bottom: none;
  transition: border-bottom 0.2s ease-out;

  i {
    font-weight: 600;
    font-size: 0.7rem;
  }

  &:hover {
    .dz-filename {
      border-bottom: 3px solid #ff8d72;
      transition: border-bottom 0.2s ease-out;
    }
  }
}

.remove-file-btn {
  padding: 0 !important;
  margin-left: 0 !important;

  &:hover {
    i {
      color: #ff8d72 !important;
    }
  }
}

.dropzone-custom-content {
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}

.removed-file {
  animation: removed-file-animation 0.6s cubic-bezier(0.65, -0.02, 0.72, 0.29);
}

@keyframes removed-file-animation {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  30% {
    opacity: 1;
    transform: translateX(50px);
  }

  80% {
    opacity: 1;
    transform: translateX(-800px);
  }

  100% {
    opacity: 0;
    transform: translateX(-800px);
  }
}

.menu__wrap {
  top: 20px !important;
  height: 91vh;
}

.remove-all-btn {
  font-size: 0.8rem !important;
  padding: 4px 10px !important;
}
</style>


