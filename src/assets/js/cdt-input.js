/**
 * 输入框组件
 * 基于CDT DESIGN设计系统
 * @module components/input
 */

/**
 * 初始化输入框组件
 * @param {HTMLElement} element - 输入框元素
 * @param {Object} options - 配置选项
 * @param {string} [options.placeholder='请输入内容'] - 占位文本
 * @param {boolean} [options.disabled=false] - 是否禁用
 * @param {boolean} [options.showSearchIcon=false] - 是否显示搜索图标
 * @param {Function} [options.onChange] - 输入变化回调函数
 * @param {Function} [options.onFocus] - 获取焦点回调函数
 * @param {Function} [options.onBlur] - 失去焦点回调函数
 * @param {Function} [options.onSearch] - 搜索回调函数
 * @returns {Object} - 组件实例
 */
function initInputComponent(element, options = {}) {
  // 默认配置
  const defaultOptions = {
    placeholder: '请输入内容',
    disabled: false,
    showSearchIcon: false,
    onChange: null,
    onFocus: null,
    onBlur: null,
    onSearch: null
  };

  // 合并配置
  const config = { ...defaultOptions, ...options };

  // 验证元素
  if (!element || !(element instanceof HTMLElement)) {
    console.error('初始化输入框组件失败：未提供有效的DOM元素');
    return null;
  }

  // 创建组件结构
  const wrapper = document.createElement('div');
  wrapper.className = 'cdt-input cdt-input--normal';

  // 创建内部容器
  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'cdt-input__wrapper';

  // 创建输入框
  const input = document.createElement('input');
  input.className = 'cdt-input__inner';
  input.type = 'text';
  input.placeholder = config.placeholder;
  
  // 添加搜索图标
  let searchIcon = null;
  if (config.showSearchIcon) {
    searchIcon = document.createElement('div');
    searchIcon.className = 'cdt-input__icon';
    searchIcon.innerHTML = `
      <svg viewBox="0 0 1024 1024" width="16" height="16">
        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6c3.2 3.2 8.4 3.2 11.6 0l43.6-43.5c3.2-3.2 3.2-8.4 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" fill="currentColor"></path>
      </svg>
    `;
    
    // 绑定搜索事件
    searchIcon.addEventListener('click', function() {
      if (!config.disabled && typeof config.onSearch === 'function') {
        config.onSearch(input.value);
      }
    });
  }

  // 创建错误消息容器
  const errorElement = document.createElement('div');
  errorElement.className = 'cdt-input__error';
  errorElement.style.display = 'none';

  // 设置禁用状态
  if (config.disabled) {
    wrapper.classList.add('cdt-input--disable');
    input.disabled = true;
  }

  // 组装组件
  innerWrapper.appendChild(input);
  if (searchIcon) {
    innerWrapper.appendChild(searchIcon);
  }
  wrapper.appendChild(innerWrapper);
  wrapper.appendChild(errorElement);

  // 替换原有元素
  element.parentNode.replaceChild(wrapper, element);

  // 绑定事件
  input.addEventListener('input', function(event) {
    if (typeof config.onChange === 'function') {
      config.onChange(event.target.value, event);
    }
  });

  input.addEventListener('focus', function(event) {
    wrapper.classList.remove('cdt-input--normal');
    wrapper.classList.add('cdt-input--inputting');
    
    if (typeof config.onFocus === 'function') {
      config.onFocus(event);
    }
  });

  input.addEventListener('blur', function(event) {
    if (input.value) {
      wrapper.classList.remove('cdt-input--inputting');
      wrapper.classList.add('cdt-input--complete');
    } else {
      wrapper.classList.remove('cdt-input--inputting');
      wrapper.classList.add('cdt-input--normal');
    }
    
    if (typeof config.onBlur === 'function') {
      config.onBlur(event);
    }
  });

  // 组件接口
  const componentAPI = {
    /**
     * 获取输入框的值
     * @returns {string} 输入框的值
     */
    getValue() {
      return input.value;
    },
    
    /**
     * 设置输入框的值
     * @param {string} value - 要设置的值
     */
    setValue(value) {
      input.value = value;
      
      if (value) {
        wrapper.classList.remove('cdt-input--normal', 'cdt-input--inputting');
        wrapper.classList.add('cdt-input--complete');
      } else {
        wrapper.classList.remove('cdt-input--complete', 'cdt-input--inputting');
        wrapper.classList.add('cdt-input--normal');
      }
    },
    
    /**
     * 设置输入框的禁用状态
     * @param {boolean} disabled - 是否禁用
     */
    setDisabled(disabled) {
      input.disabled = disabled;
      
      if (disabled) {
        wrapper.classList.remove('cdt-input--normal', 'cdt-input--inputting', 'cdt-input--complete', 'cdt-input--wrong');
        wrapper.classList.add('cdt-input--disable');
      } else {
        wrapper.classList.remove('cdt-input--disable');
        
        if (input.value) {
          wrapper.classList.add('cdt-input--complete');
        } else {
          wrapper.classList.add('cdt-input--normal');
        }
      }
    },
    
    /**
     * 设置错误状态和错误消息
     * @param {string|null} errorMessage - 错误消息，null表示清除错误
     */
    setError(errorMessage) {
      if (errorMessage) {
        wrapper.classList.remove('cdt-input--normal', 'cdt-input--inputting', 'cdt-input--complete', 'cdt-input--disable');
        wrapper.classList.add('cdt-input--wrong');
        
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
      } else {
        wrapper.classList.remove('cdt-input--wrong');
        
        if (input.disabled) {
          wrapper.classList.add('cdt-input--disable');
        } else if (input.value) {
          wrapper.classList.add('cdt-input--complete');
        } else {
          wrapper.classList.add('cdt-input--normal');
        }
        
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      }
    },
    
    /**
     * 聚焦输入框
     */
    focus() {
      input.focus();
    },
    
    /**
     * 销毁组件，移除事件监听器
     */
    destroy() {
      input.removeEventListener('input', config.onChange);
      input.removeEventListener('focus', config.onFocus);
      input.removeEventListener('blur', config.onBlur);
      
      if (searchIcon) {
        searchIcon.removeEventListener('click', config.onSearch);
      }
    }
  };

  return componentAPI;
}

// 创建全局Input对象
const CdtInput = {
  init: initInputComponent
};

// 导出模块
export default CdtInput; 