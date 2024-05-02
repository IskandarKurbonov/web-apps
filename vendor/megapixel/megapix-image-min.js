//  Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com>
//  SPDX-FileCopyrightText: 2024 Ascensio System SIA
//
//  SPDX-License-Identifier: Ascensio-System
//
//     Our License onlyoffice.com
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     

(function(){function q(c,a){var b=document.createElement("canvas");r(c,b,a);return b.toDataURL("image/jpeg",a.quality||0.8)}function r(c,a,b){var e=c.naturalWidth,j=c.naturalHeight,f=b.width,g=b.height,m=a.getContext("2d");m.save();b=b.orientation;switch(b){case 5:case 6:case 7:case 8:a.width=g;a.height=f;break;default:a.width=f,a.height=g}a=a.getContext("2d");switch(b){case 2:a.translate(f,0);a.scale(-1,1);break;case 3:a.translate(f,g);a.rotate(Math.PI);break;case 4:a.translate(0,g);a.scale(1,-1);
break;case 5:a.rotate(0.5*Math.PI);a.scale(1,-1);break;case 6:a.rotate(0.5*Math.PI);a.translate(0,-g);break;case 7:a.rotate(0.5*Math.PI);a.translate(f,-g);a.scale(-1,1);break;case 8:a.rotate(-0.5*Math.PI),a.translate(-f,0)}a=c.naturalWidth;1048576<a*c.naturalHeight?(b=document.createElement("canvas"),b.width=b.height=1,b=b.getContext("2d"),b.drawImage(c,-a+1,0),a=0===b.getImageData(0,0,1,1).data[3]):a=!1;a&&(e/=2,j/=2);a=document.createElement("canvas");a.width=a.height=1024;b=a.getContext("2d");
var h;h=j;var d=document.createElement("canvas");d.width=1;d.height=h;d=d.getContext("2d");d.drawImage(c,0,0);for(var d=d.getImageData(0,0,1,h).data,n=0,k=h,l=h;l>n;)0===d[4*(l-1)+3]?k=l:n=l,l=k+n>>1;h=l/h;h=0===h?1:h;for(d=0;d<j;){n=d+1024>j?j-d:1024;for(k=0;k<e;){l=k+1024>e?e-k:1024;b.clearRect(0,0,1024,1024);b.drawImage(c,-k,-d);var p=k*f/e<<0,q=Math.ceil(l*f/e),r=d*g/j/h<<0,s=Math.ceil(n*g/j/h);m.drawImage(a,0,0,l,n,p,r,q,s);k+=1024}d+=1024}m.restore()}function p(c){if(c instanceof Blob){var a=
new Image,b=window.URL&&window.URL.createObjectURL?window.URL:window.webkitURL&&window.webkitURL.createObjectURL?window.webkitURL:null;if(!b)throw Error("No createObjectURL function found to create blob url");a.src=b.createObjectURL(c);c=a}if(!c.naturalWidth&&!c.naturalHeight){var e=this;c.onload=function(){var a=e.imageLoadListeners;if(a){e.imageLoadListeners=null;for(var b=0,c=a.length;b<c;b++)a[b]()}};this.imageLoadListeners=[]}this.srcImage=c}p.prototype.render=function(c,a){if(this.imageLoadListeners){var b=
this;this.imageLoadListeners.push(function(){b.render(c,a)})}else{a=a||{};var e=this.srcImage.naturalWidth,j=this.srcImage.naturalHeight,f=a.width,g=a.height,m=a.maxWidth,h=a.maxHeight;f&&!g?g=j*f/e<<0:g&&!f?f=e*g/j<<0:(f=e,g=j);m&&f>m&&(f=m,g=j*f/e<<0);h&&g>h&&(g=h,f=e*g/j<<0);var e={width:f,height:g},d;for(d in a)e[d]=a[d];d=c.tagName.toLowerCase();"img"===d?c.src=q(this.srcImage,e):"canvas"===d&&r(this.srcImage,c,e);if("function"===typeof this.onrender)this.onrender(c)}};p.prototype.getUrl=function(){return q(this.srcImage,
{})};"function"===typeof define&&define.amd?define([],function(){return p}):this.MegaPixImage=p})();