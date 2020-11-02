
var reda = 0;
var elementpicked = "";
var elementEmpty = "";
  let datainject = "";
let POS = ""

  
var DomOutline = function (options) {
  
    options = options || {};

    var pub = {};
    var self = {
        opts: {
            namespace: options.namespace || 'DomOutline',
            borderWidth: options.borderWidth || 2,
            onClick: options.onClick || false,
            filter: options.filter || false
        },
        keyCodes: {
            BACKSPACE: 8,
            ESC: 27,
            DELETE: 46
        },
        active: false,
        initialized: false,
        elements: {}
    };




 
    function removeOutlineElements() {
        jQuery.each(self.elements, function(name, element) {
            element.remove();
        });
    }
 
    function compileLabelText(element, width, height) {
        var label = element.tagName.toLowerCase();

        console.log(element)
        if (element.id) {
            label += '#' + element.id;
        }
        if (element.className) {
            label += ('.' + jQuery.trim(element.className).replace(/ /g, '.')).replace(/\.\.+/g, '.');
        }
        return element;
    }
    function getScrollTop() {
        if (!self.elements.window) {
            self.elements.window = jQuery(window);
        }
        return self.elements.window.scrollTop();
    }

    function getElementXPath(element) {
        if (element && element.id)
            return '//*[@id="' + element.id + '"]';
        else
            return getElementTreeXPath(element);
    }
 function clickHandler(e) {
                 alert('you start me ')

        $('#pos-editor-instruction-container').css("display" ,"none");
        $('#pos-editor-actions').css("display" ,"block");
        $('#trust-seals-content-div').css("opacity","unset");
         pub.stop();
        return false;
    }

    function getElementTreeXPath(element) {
        var paths = [];
        for (; element && element.nodeType == Node.ELEMENT_NODE;
               element = element.parentNode)
        {
            var index = 0;
            var hasFollowingSiblings = false;
            for (var sibling = element.previousSibling; sibling;
                 sibling = sibling.previousSibling)
            {
                if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                    continue;

                if (sibling.nodeName == element.nodeName)
                    ++index;
            }

            for (var sibling = element.nextSibling;
                 sibling && !hasFollowingSiblings;
                 sibling = sibling.nextSibling)
            {
                if (sibling.nodeName == element.nodeName)
                    hasFollowingSiblings = true;
            }

            var tagName = (element.prefix ? element.prefix + ":" : "")
                + element.localName;
            var pathIndex = (index || hasFollowingSiblings ? "["
                + (index + 1) + "]" : "");
            paths.splice(0, 0, tagName + pathIndex);
        }

        return paths.length ? "/" + paths.join("/") : null;
    }
  
    function updateOutlinePosition(e) {
        if (e.target.className.indexOf(self.opts.namespace) !== -1) {
            return;
        }
        if (self.opts.filter) {
            if (!jQuery(e.target).is(self.opts.filter)) {
                return;
            }
        }
        pub.element = e.target;
        var b = self.opts.borderWidth;
        var scroll_top = getScrollTop();
        var pos = pub.element.getBoundingClientRect();
        var top = pos.top + scroll_top;
   var label_text = compileLabelText(pub.element, pos.width, pos.height);

 if (label_text!=reda) {

 
 reda = label_text;
 var er=  getElementTreeXPath(reda)
elementEmpty=reda;
         
   if(reda.className=="")  {
      POS=label_text;

    if (reda.className!="trust-seals-preview" && elementpicked !=er ) {
   var re= document.getElementsByClassName("trust-seals-preview")
   if(re && re.length>0){
    for (var i =re.length-1; i >-1; i--) {
          re[i].remove()

    }
   }

 var cp=document.createElement("p")
    cp.className="ingore"
    cp.innerHTML='<div id="trust-seals-content-div" class="trust-seals-preview" style="text-align: center; width: 100%;">'+datainject.innerHTML+'</div>'
    elementEmpty.appendChild(cp)
    console.log(cp)
// jQuery('<p class="ingore"><p id="re222"  class="text-center12333" ><a href="#" class="btn btn-primary">Buy Now</a></p> </p>').appendTo(""+reda);
//console.log("afte"+elementpicked)
elementpicked= er;

jQuery('body').bind('click.' + self.opts.namespace, clickHandler);

//console.log("before"+elementpicked)
} } else{
   POS=label_text;
   if (reda.className!="trust-seals-preview" && elementpicked !=er ) {
   var re= document.getElementsByClassName("trust-seals-preview")
   if(re && re.length>0){
    for (var i =re.length-1; i >-1; i--) {
          re[i].remove()
    }
   }

 var cp=document.createElement("p")
    cp.className="ingore"
    cp.innerHTML='<div id="trust-seals-content-div" class="trust-seals-preview" style="text-align: center; width: 100%;">'+datainject.innerHTML+'</div>';
    reda.appendChild(cp)
// jQuery('<p class="ingore"><p id="re222"  class="text-center12333" ><a href="#" class="btn btn-primary">Buy Now</a></p> </p>').appendTo(""+reda);
  elementpicked= er;
  elementEmpty=reda.className;
jQuery('body').bind('click.' + self.opts.namespace, clickHandler);

   }
   }
  //  jQuery('<div  class="ingore"><div  class="text-center"><a href="#" class="btn btn-primary">Buy Now</a></div></div>').appendTo(""+reda);

        }
            }

    function stopOnEscape(e) {
        if (e.keyCode === self.keyCodes.ESC || e.keyCode === self.keyCodes.BACKSPACE || e.keyCode === self.keyCodes.DELETE) {
        $('body').off('mouseover.' + self.opts.namespace).off('keyup.' + self.opts.namespace).off('click.' + self.opts.namespace);
        }

        return false;
    }



    pub.start = function () {
        if (self.active !== true) {
          alert('you start me ')
            self.active = true;
            $('body').on('mouseover.' + self.opts.namespace, updateOutlinePosition);
            $('body').on('keyup.' + self.opts.namespace, stopOnEscape);
            if (self.opts.onClick) {
                setTimeout(function () {
                    $('body').on('click.' + self.opts.namespace, function(e){
                        if (self.opts.filter) {
                            if (!$(e.target).is(self.opts.filter)) {
                                return false;
                            }
                        }
                        clickHandler.call(this, e);
                    });
                }, 50);
            }
        }
    };

 
  
   
  
    pub.stop = function () {
      alert('stooop');
        self.active = false;
        $('body').off('mouseover.' + self.opts.namespace).off('keyup.' + self.opts.namespace).off('click.' + self.opts.namespace);
    };

    return pub;
};  
