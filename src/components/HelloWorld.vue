<template>
	<div id="app">
		<div class="amap-page-container">
	      <el-amap-search-box
	      	class="search-box"
	      	:search-option="searchOption"
	      	:on-search-result="onSearchResult">
	      </el-amap-search-box>
	      <el-amap
	      	vid="amapDemo"
	      	:center="mapCenter"
	      	:zoom="12"
	      	class="amap-demo">
	        <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
	      </el-amap>
	    </div>
	</div>
</template>
<script>
    module.exports = {
      data() {
        return {

          markers: [
            [121.59996, 31.197646],
          ],
          searchOption: {
            city: '',
            citylimit: true
          },
          mapCenter: [121.59996, 31.197646]
        };
      },
      methods: {
        addMarker: function() {
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          this.markers.push([lng, lat]);
        },
        onSearchResult(pois) {
        	console.log(pois);
	        let latSum = 0;
	        let lngSum = 0;
	        if (pois.length > 0) {
	            pois.forEach(poi => {
	              let {lng, lat} = poi;
	              lngSum += lng;
	              latSum += lat;
	              this.markers.push([poi.lng, poi.lat]);
	            });
	            let center = {
	              lng: lngSum / pois.length,
	              lat: latSum / pois.length
	            };
	            this.mapCenter = [center.lng, center.lat];
	        }
        }
      }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el-vue-amap-container {
		height: 100%;
		width: 100%;
		position: absolute !important;
	}
	.el-vue-search-box-container {
	    position: absolute;
	    margin: 20px;
	        z-index: 8;
    }
    .amap-page-container{
    	position: relative;
	    float: left;
	    width: 100%;
	    height: 680px;
    }
    #app{
    	float: left;
    	width: 100%;
    }
</style>
